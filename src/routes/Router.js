const { autoLogin } = require("../middleware/autoLogin");
const { homeRoutes } = require("./API");
const { adminRoutes } = require("./Admin/admin.routes");
const { authRoutes } = require("./User/Auth");
const { DeveloperRoutes } = require("./developers.routes");
const router = require("express").Router();

router.use("/auth", authRoutes);
router.use("/dev", autoLogin, DeveloperRoutes);
router.use("/admin", autoLogin, adminRoutes);
router.use("/", autoLogin, homeRoutes);

module.exports = {
  allRoutes: router,
};
