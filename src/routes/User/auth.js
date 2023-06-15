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
 *  /auth/get-otp:
 *      post:
 *          summary: get otp api
 *          tags: [auth]
 *          description: login with phone number => one time password (OTP)
 *          parameters:
 *                - name : phone
 *                  in : formData
 *                  required : true
 *                  description : fa-IRI phone number
 *                  type : string
 *          responses:
 *              200:
 *                 description: Success
 *              400:
 *                 description: Bad Request
 *              401:
 *                 description: UnAuthorization
 *              500:
 *                 description: Internal Server Error
 */

/**
 * @swagger
 *  /auth/check-otp:
 *      post:
 *          summary: check otp api
 *          tags: [auth]
 *          description: login with phone number => one time password (OTP)
 *          parameters:
 *                - name : phone
 *                  in : formData
 *                  required : true
 *                  description : fa-IRI phone number
 *                  type : string
 *                - name : code
 *                  in : formData
 *                  required : true
 *                  description : otp code
 *                  type : string
 *          responses:
 *              200:
 *                 description: Success
 *              400:
 *                 description: Bad Request
 *              401:
 *                 description: UnAuthorization
 *              500:
 *                 description: Internal Server Error
 */


router.post("/get-otp", UserAuthController.getOtp);
router.post("/check-otp", UserAuthController.checkOtp);

module.exports = {
  authRoutes: router,
};
