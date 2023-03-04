const { Controller } = require("../controller");

class HomeController extends Controller {
  async indexPage(req, res, next) {
    try {
      return res.status(200).send("index page store");
    } catch (err) {
      next(err);
    }
  }
}

module.exports = {
  HomeController: new HomeController(),
};
