const LeadsHandler = require("./handler");
const routes = require("./routes");

module.exports = {
  name: "leads",
  version: "1.0.0",
  register: async (server, { leadsService }) => {
    const handler = new LeadsHandler(leadsService);
    server.route(routes(handler));
  },
};
