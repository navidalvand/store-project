const { UserModel } = require("../models/user");
const jwt = require("jsonwebtoken");

const verifyAccessToken = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) throw { status: 401, message: "please login to your account" };
    const payload = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET_KEY
    );
    if (!payload)
      throw { status: 401, message: "please login to your account" };
    const { phone } = payload;
    const user = await UserModel.findOne({ phone });
    if (!user) throw { status: 404, message: "account not found" };
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  verifyAccessToken,
};
