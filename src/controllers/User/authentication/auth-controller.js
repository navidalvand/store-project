const { UserModel } = require("../../../models/user");
const { OTPNumber } = require("../../../utils/OTP");
const { getOtpSchema } = require("../../../validators/user/auth-schema");
const createError = require("http-errors");
const { Controller } = require("../../controller");

class UserAuthController extends Controller {
  async getOtp(req, res, next) {
    try {
      await getOtpSchema.validateAsync(req.body);
      const { phone } = req.body;
      const code = OTPNumber();
      const result = await this.saveUser(phone, code);
      if (!result) throw createError.Unauthorized("cannot login");
      return res.status(200).send({
        data: {
          statusCode: 200,
          data: {
            message: "ok",
            code,
            phone,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }

  checkOtp() {
    try {
      const now = new Date().getTime();
      const { phone, code } = req.body;
      const user = this.checkExistUser(phone);
      if (user.otp.code !== code)
        throw { statusCode: 400, message: "wrong code" };
      if (user.otp.expiresIn < now)
        throw { statusCode: 400, message: "the otp password expired" };
        
    } catch (err) {
      next(err);
    }
  }

  async saveUser(phone, code) {
    const now = new Date().getTime();
    let otp = {
      code,
      expiresIn: now + 120000,
    };

    const user = await this.checkExistUser(phone);
    if (user) {
      console.log(user.otp, now);
      if (+user.otp.expiresIn > now)
        throw createError.Forbidden("the code is stil useable");
      return await this.updateUser(phone, { otp });
    }
    return await UserModel.create({
      phone,
      otp,
    });
  }

  async checkExistUser(phone) {
    const user = await UserModel.findOne({ phone: phone });
    return user;
  }

  async updateUser(phone, data = {}) {
    Object.keys(data).forEach((key) => {
      if (["", " ", 0, null, undefined, "0", NaN].includes(data[key]))
        delete data[key];
    });
    const updateResult = await UserModel.updateOne({ phone }, { $set: data });
    return !!updateResult.modifiedCount;
  }
}

module.exports = {
  UserAuthController: new UserAuthController(),
};
