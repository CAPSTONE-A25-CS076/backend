const AuthHandler = require("./handler");
const routes = require("./routes");

module.exports = {
  name: "auth",
  version: "1.0.0",
  register: async (server, { usersService, tokenManager }) => {
    const handler = new AuthHandler(usersService, tokenManager);
    server.route(routes(handler));
  },
};
