class AuthenticationsHandler {
  constructor(usersService, tokenManager) {
    this._usersService = usersService;
    this._tokenManager = tokenManager;

    this.postLoginHandler = this.postLoginHandler.bind(this);
    this.getMeHandler = this.getMeHandler.bind(this);
  }

  async postLoginHandler(request, h) {
    const { username, password } = request.payload || {};

    if (!username || !password) {
      const response = h.response({
        status: "fail",
        message: "Username dan password wajib diisi",
      });
      response.code(400);
      return response;
    }

    const user = await this._usersService.verifyUserCredential(
      username,
      password
    );

    const token = this._tokenManager.generateAccessToken(user);

    const response = h.response({
      status: "success",
      message: "Login berhasil",
      data: {
        user,
        token,
      },
    });
    response.code(200);
    return response;
  }

  async getMeHandler(request, h) {
    const { credentials } = request.auth;
    return {
      status: "success",
      data: {
        user: credentials,
      },
    };
  }
}

module.exports = AuthenticationsHandler;
