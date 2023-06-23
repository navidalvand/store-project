const bcrypt = require("bcrypt");
const { randomNumberGenerator } = require("../utils/random-number");
const router = require("express").Router();

router.get("/hash-password/:password", (req, res, next) => {
  try {
    const { password } = req.params;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    res.send(hash);
  } catch (err) {
    next(err);
  }
});

router.get("/random-number", (req, res, next) => {
  try {
    const randomNumber = randomNumberGenerator();
    res.send(randomNumber.toString())
  } catch (err) {
    next(err);
  }
});

module.exports = {
  DeveloperRoutes: router,
};
