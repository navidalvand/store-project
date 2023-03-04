const { authSchema } = require("../../../validators/user/auth-schema");
const createError = require('http-errors');


class UserAuthController {
  async register(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const result = await authSchema.validateAsync(req.body);
      res.send("login successfully!")
    } catch (err) {
      next(createError.BadRequest(err.message));
    }
  }
}

module.exports = {
  UserAuthController: new UserAuthController(),
};
