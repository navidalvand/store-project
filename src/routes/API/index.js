const { HomeController } = require('../../controllers/API/home-controller')

const router = require('express').Router()

router.post("/" , HomeController.indexPage)





module.exports = {
    homeRoutes : router
}
