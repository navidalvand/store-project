const { CategoryModel } = require("../../models/category");
const { Controller } = require("../controller");

class CategoryController extends Controller {
  async createCategory(req, res, next) {
    try {
      const { title, parent } = req.body;
      const category = await CategoryModel.create({ title, parent });
      if (!category) throw { status: 500, message: "cannot create category" };
      res.status(201).json({
        data: category,
        message: "created",
      });
    } catch (err) {
      next(err);
    }
  }
  async deleteCategory(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
  async updateCategory(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
  async getAllCategories(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
  async getCategoryById(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
  async getAllParents(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
  async getAllChildrenByParent(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
}


module.exports = {
    CategoryController : new CategoryController()
}
