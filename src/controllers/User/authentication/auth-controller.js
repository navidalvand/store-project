const { UserModel } = require("../../../models/user");
const { OTPNumber } = require("../../../utils/OTP");
const { mobileAuthSchema } = require("../../../validators/user/auth-schema");
const createError = require('http-errors');


class UserAuthController {
  async login(req, res, next) {
    try {
      const result = await mobileAuthSchema.validateAsync(req.body);
      const {phone} = req.body
      
      res.send("login successfully!")
    } catch (err) {
      next(createError.BadRequest(err.message));
    }
  }


  async saveUser (phone) {
      const result = this.checkExistUser(phone)
      if(!result) return this.updateUser(phone , {})
  }

  async checkExistUser (phone) {
    const user = UserModel.findOne({phone})
    return !!user
  }

  async updateUser (phone , data = {}) {

  }

}

module.exports = {
  UserAuthController: new UserAuthController(),
};
