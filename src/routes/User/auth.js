const {
  UserAuthController,
} = require("../../controllers/User/authentication/auth-controller");
const router = require("express").Router();

/**
 * @swagger
 *  tags :
 *      name : auth
 *      description : register & login & logout APIs
 */

/**
 * @swagger
 *  /auth/login:
 *      post:
 *          summary: login api
 *          tags: [auth]
 *          description: login with phone number => one time password (OTP)
 *          parameters: 
 *                - name : phone
 *                  in : formData
 *                  required : true
 *                  description : fa-IRI phone number
 *                  type : string
 *          responses:
 *              201:
 *                 description: Success
 *              400:
 *                 description: Bad Request
 *              401:
 *                 description: UnAuthorization
 *              500:
 *                 description: Internal Server Error
 */

router.post("/login", UserAuthController.getOtp);

module.exports = {
  authRoutes: router,
};
