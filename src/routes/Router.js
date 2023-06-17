const { autoLogin } = require("../middleware/autoLogin");
const { homeRoutes } = require("./API");
const { authRoutes } = require("./User/Auth");
const { DeveloperRoutes } = require("./developers.routes");
const router = require("express").Router();

router.use("/auth", authRoutes);
router.use("/dev" , DeveloperRoutes)
router.use("/", autoLogin, homeRoutes);

module.exports = {
  allRoutes: router,
};
