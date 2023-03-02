const { homeRoutes } = require("./API");

const router = require("express").Router();


router.use("/" , homeRoutes)





module.exports = {
  allRoutes: router,
};
 