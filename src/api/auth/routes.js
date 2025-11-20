const routes = (handler) => [
  {
    method: "POST",
    path: "/login",
    options: {
      auth: false,
      handler: handler.postLoginHandler,
    },
  },
  {
    method: "GET",
    path: "/me",
    options: {
      auth: "jwt_strategy",
      handler: handler.getMeHandler,
    },
  },
];

module.exports = routes;
