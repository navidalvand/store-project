const { UserAuthController } = require('../../controllers/User/authentication/auth-controller')

const router = require('express').Router()


router.post("/register" , UserAuthController.register)
router.post("/login" , UserAuthController.login)









module.exports = {
    authRoutes : router
}
