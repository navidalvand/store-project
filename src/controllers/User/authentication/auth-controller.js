const { UserModel } = require("../../../models/user");
const { OTPNumber } = require("../../../utils/OTP");
const { EXPIRES_IN, USER_ROLE } = require("../../../utils/constant");
const { mobileAuthSchema } = require("../../../validators/user/auth-schema");
const createError = require("http-errors");
const { Controller } = require("../../controller");

class UserAuthController extends Controller {
  async login(req, res, next) {
    try {
      await mobileAuthSchema.validateAsync(req.body);
      const { phone } = req.body;
      const code = OTPNumber();
      const result = await this.saveUser(phone, code);
      console.log("MAIN RESULT = " + result);
      if (!result) throw createError.Unauthorized();
      return res.status(201).json({
        data: {
          status: 201,
          message: "login",
          code,
          phone,
        },
      });
    } catch (err) {
      next(err.message);
    }
  }

  async saveUser(phone, code) {
    let otp = {
      code,
      expiresIn: EXPIRES_IN,
    };

    const result = await this.checkExistUser(phone);
    if (result) return await this.updateUser(phone, { otp });

    const test = await UserModel.create({
      phone,
      otp,
    });

    console.log(test);
  }

  async checkExistUser(phone) {
    const user = await UserModel.findOne({ phone });
    console.log(user);
    return !!user;
  }

  async updateUser(phone, data = {}) {
    Object.keys(data).forEach((key) => {
      if (!data[key]) delete data[key];
    });
    const updateResult = await UserModel.updateOne({ phone }, {$set : data});
    return !!updateResult.modifiedCount;
  }
}

module.exports = {
  UserAuthController: new UserAuthController(),
};
