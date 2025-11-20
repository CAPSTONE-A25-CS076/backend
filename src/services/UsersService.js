const sql = require("../database");
const bcrypt = require("bcrypt");
const AuthenticationError = require("../exceptions/AuthenticationError");

class UsersService {
  async verifyUserCredential(username, password) {
    const result = await sql`
      SELECT id, username, password_hash
      FROM users
      WHERE username = ${username}
    `;

    if (result.length === 0) {
      throw new AuthenticationError("Username atau password salah");
    }

    const user = result[0];

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      throw new AuthenticationError("Username atau password salah");
    }

    return {
      id: user.id,
      username: user.username,
    };
  }
}

module.exports = UsersService;
