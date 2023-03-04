const { homeRoutes } = require("./API");
const { authRoutes } = require("./User/Auth");

const router = require("express").Router();


router.use("/" , homeRoutes)
router.use("/auth" , authRoutes)




module.exports = {
  allRoutes: router,
};
 