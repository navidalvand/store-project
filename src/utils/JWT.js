const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user");

function signAccessToken(userId) {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findById(userId);
    const paload = {
      phone: user.phone,
      userID: user._id,
    };
    const secret = process.env.SECRET_KEY;
    const options = {
      expiresIn: "1h",
    };
    jwt.sign(paload, secret, options, (err, token) => {
      if (err) reject(createError.InternalServerError());
      resolve(token);
    });
  });
}



module.exports = {
    signAccessToken
}
