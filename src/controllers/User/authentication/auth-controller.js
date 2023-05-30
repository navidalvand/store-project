const { UserModel } = require("../../../models/user");
const { OTPNumber } = require("../../../utils/OTP");
const {
  getOtpSchema,
  checkOtpSchema,
} = require("../../../validators/user/auth-schema");
const createError = require("http-errors");
const { Controller } = require("../../controller");
const { signAccessToken } = require("../../../utils/JWT");

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

  async checkOtp(req, res, next) {
    try {
      await checkOtpSchema.validateAsync(req.body);
      const now = new Date().getTime();
      const { phone, code } = req.body;
      const user = await UserModel.findOne({ phone });
      if (!user) throw createError.NotFound();
      // if (user.otp.code !== code) throw createError.Unauthorized("wrong code");
      if (user.otp.expiresIn < now)
        throw createError.Unauthorized("the otp password expired");
      const accessToken = await signAccessToken(user._id);
      res.cookie("token", accessToken, {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
      });

      return res.status(200).json({
        statusCode: 200,
        message: "ok",
        accessToken,
      });
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
