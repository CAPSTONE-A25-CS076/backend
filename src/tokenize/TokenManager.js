const Jwt = require("@hapi/jwt");

const TokenManager = {
  generateAccessToken: (user) => {
    return Jwt.token.generate(
      {
        id: user.id,
        username: user.username,
      },
      {
        key: process.env.JWT_ACCESS_TOKEN_KEY,
        algorithm: "HS256",
      },
      {
        ttlSec: Number(process.env.JWT_ACCESS_TOKEN_AGE) || 1800,
      }
    );
  },
};

module.exports = TokenManager;
