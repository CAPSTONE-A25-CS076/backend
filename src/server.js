require("dotenv").config();
const Hapi = require("@hapi/hapi");
const Jwt = require("@hapi/jwt");
const path = require("path");

const UsersService = require("./services/UsersService");
const LeadsService = require("./services/LeadsService");
const TokenManager = require("./tokenize/TokenManager");
const authentications = require("./api/auth");
const leads = require("./api/leads");
const ClientError = require("./exceptions/ClientError");

const init = async () => {
  const usersService = new UsersService();
  const leadsService = new LeadsService();

  const server = Hapi.server({
    port: process.env.PORT || 5000,
    host: "0.0.0.0",
    routes: {
      cors: {
        origin: ["*"],
        additionalHeaders: ["Authorization", "Content-Type"],
        additionalExposedHeaders: ["Authorization"],
      },
    },
  });

  await server.register(Jwt);

  server.auth.strategy("jwt_strategy", "jwt", {
    keys: process.env.JWT_ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: Number(process.env.JWT_ACCESS_TOKEN_AGE) || 1800,
    },
    validate: (artifacts) => {
      const { id, username } = artifacts.decoded.payload;
      return {
        isValid: true,
        credentials: { id, username },
      };
    },
  });

  server.ext("onPreResponse", (request, h) => {
    const { response } = request;

    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: "fail",
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }

    if (response.isBoom) {
      const newResponse = h.response({
        status: "error",
        message: response.message || "Terjadi kegagalan pada server kami",
      });
      newResponse.code(response.output.statusCode || 500);
      return newResponse;
    }

    return h.continue;
  });

  await server.register({
    plugin: authentications,
    options: {
      usersService,
      tokenManager: TokenManager,
    },
  });

  await server.register({
    plugin: leads,
    options: {
      leadsService,
    },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
