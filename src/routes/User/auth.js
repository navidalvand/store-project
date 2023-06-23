const {
  UserAuthController,
} = require("../../controllers/User/authentication/auth-controller");
const router = require("express").Router();

router.post("/get-otp", UserAuthController.getOtp);
router.post("/check-otp", UserAuthController.checkOtp);

module.exports = {
  authRoutes: router,
};
