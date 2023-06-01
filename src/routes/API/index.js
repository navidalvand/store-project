const { HomeController } = require('../../controllers/API/home-controller')
const { verifyAccessToken } = require('../../middleware/autoLogin')
const router = require('express').Router()

/**
 * @swagger
 *  tags :
 *      name : home page
 *      description : home page data
 * 
 */

/**
 * @swagger
 * /:
 *  get:
 *      summary : home page
 *      tags : [home page]
 *      description : home page
 *      responses:
 *          200 :
 *              description : success
 *          404 : 
 *              description : not found
 * 
 */


router.get("/" , verifyAccessToken , HomeController.indexPage)


module.exports = {
    homeRoutes : router
}
