const AuthenticationsHandler = require("./handler");
const routes = require("./routes");

module.exports = {
  name: "authentications",
  version: "1.0.0",
  register: async (server, { usersService, tokenManager }) => {
    const handler = new AuthenticationsHandler(usersService, tokenManager);
    server.route(routes(handler));
  },
};
