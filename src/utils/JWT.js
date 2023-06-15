const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user");
const redisClient = require("./init-redis");

async function signAccessToken(userId) {
  const user = await UserModel.findById(userId);
  const payload = {
    phone: user.phone,
  };
  return await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: "1d",
  });
}

async function verifyAccessToken(token) {
  const tokenPayload = await jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET_KEY
  );
  const { phone } = tokenPayload;
  const user = await UserModel.findOne({ phone });
  if (!user) throw { status: 404, message: "account not found" };
  return user;
}

async function signRefreshToken(userId) {
  const user = await UserModel.findById(userId);
  const paload = {
    phone: user.phone,
  };
  const refreshToken = await jwt.sign(
    paload,
    process.env.REFRESH_TOKEN_SECRET_KEY,
    {
      expiresIn: "1y",
    }
  );
  const pureID = userId.toString()
  await redisClient.SETEX(pureID, 365 * 24 * 60 * 60, refreshToken);
  return refreshToken;
}

async function verifyRefreshToken(token) {
  const payload = await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY);
  if (!payload) throw { status: 401, message: "something wrong!" };
  const { phone } = payload;
  const user = await UserModel.findOne({ phone });
  if (!user) throw { status: 404, message: "account not found" };

  const pureID = user._id.toString()
  const refreshToken = await redisClient.get(pureID)
  if (token === refreshToken) return user;
  throw { status: 401, message: "unAuthorized" };
}

module.exports = {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  verifyAccessToken,
};
