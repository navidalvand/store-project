const bcrypt = require("bcrypt");
const { randomNumberGenerator } = require("../utils/random-number");
const router = require("express").Router();

/**
 * @swagger
 *  tags :
 *      name : dev routes
 *      description : developers APIs
 */

/**
 * @swagger
 * /dev/hash-password/{password}:
 *  get:
 *      summary : create hash value
 *      tags : [dev routes]
 *      description : hash generator
 *      parameters:
 *            - name : password
 *              in : path
 *              required : true
 *              description : password input
 *              type : string
 *      responses:
 *          200:
 *             description: Success
 *          500:
 *             description: Internal Server Error
 */

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

/**
 * @swagger
 * /dev/random-number/:
 *  get:
 *      summary : create a random number
 *      tags : [dev routes]
 *      description : random number generator
 *      responses:
 *          200:
 *             description: Success
 *          500:
 *             description: Internal Server Error
 */

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
