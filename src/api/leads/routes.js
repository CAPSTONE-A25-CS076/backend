const routes = (handler) => [
  {
    method: "GET",
    path: "/leads",
    options: {
      auth: false,
      handler: handler.getLeadsHandler,
    },
  },
];

module.exports = routes;
