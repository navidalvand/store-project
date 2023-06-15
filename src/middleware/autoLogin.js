const {
  signRefreshToken,
  signAccessToken,
  verifyAccessToken,
  verifyRefreshToken,
} = require("../utils/JWT");

const autoLogin = async (req, res, next) => {
  try {
    const { token, refreshToken } = req.cookies;
    if (!refreshToken)
      throw { status: 401, message: "please login to your account" };

      if (!token) {
        const user = await verifyRefreshToken(refreshToken);
      const newRefresh = await signRefreshToken(user._id);
      const newToken = await signAccessToken(user._id);
      res.cookie("token", newToken, {
        maxAge: 86400000,
        httpOnly: true,
      });
      res.cookie("refreshToken", newRefresh, {
        maxAge: 86400000 * 365,
        httpOnly: true,
      });
      req.user = user;
      next();
    } else {
      const user = await verifyAccessToken(token);
      req.user = user;
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  autoLogin,
};
