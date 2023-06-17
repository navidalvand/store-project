const { UserModel } = require("../../../models/user");
const { randomNumberGenerator } = require("../../../utils/random-number");
const {
  getOtpSchema,
  checkOtpSchema,
} = require("../../../validators/user/auth-schema");
const createError = require("http-errors");
const { Controller } = require("../../controller");
const {
  signAccessToken,
  signRefreshToken,
} = require("../../../utils/JWT");

class UserAuthController extends Controller {
  async getOtp(req, res, next) {
    try {
      await getOtpSchema.validateAsync(req.body);
      const { phone } = req.body;
      const code = randomNumberGenerator();
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
      if (user.otp.expiresIn < now)
        throw createError.Unauthorized("the otp password expired");
      if (user.otp.code != code)
        throw { status: 401, message: "otp password is wrong" };
      const accessToken = await signAccessToken(user._id);
      const refreshToken = await signRefreshToken(user._id);
      res.cookie("token", accessToken, {
        maxAge: 86400000,
        httpOnly: true,
      });
      res.cookie("refreshToken", refreshToken, {
        maxAge: 86400000 * 365,
        httpOnly: true,
      });

      return res.status(200).json({
        statusCode: 200,
        message: "ok",
        accessToken,
        refreshToken,
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
