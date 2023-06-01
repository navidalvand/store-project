const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user");

function signAccessToken(userId) {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findById(userId);
    const paload = {
      phone: user.phone,
    };
    const options = {
      expiresIn: "1h",
    };
    jwt.sign(
      paload,
      process.env.ACCESS_TOKEN_SECRET_KEY,
      options,
      (err, token) => {
        if (err) reject(createError.InternalServerError());
        resolve(token);
      }
    );
  });
}



module.exports = {
  signAccessToken,
};
