const { CategoryModel } = require("../../models/category");
const {
  createCategorySchema,
} = require("../../validators/admin/category.schema");
const mongoose = require("mongoose");
const { Controller } = require("../controller");

class CategoryController extends Controller {
  async createCategory(req, res, next) {
    try {
      await createCategorySchema.validateAsync(req.body);
      const { title, parent } = req.body;
      if (parent) {
        const checkParent = await CategoryModel.findById(parent);
        if (!checkParent)
          throw { status: 401, message: "parent id does not exist" };
      }

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
      const categoryId = req.params.id;
      const deletedCategory = await CategoryModel.deleteMany({
        $or: [
          {
            _id: categoryId,
          },
          {
            parent: categoryId,
          },
        ],
      });
      if (deletedCategory.deletedCount === 0)
        throw { status: 404, message: "category not found" };

      res.status(200).json({
        message: "category deleted",
        data: deletedCategory,
      });
    } catch (err) {
      next(err);
    }
  }
  async updateCategory(req, res, next) {
    try {
      const { id } = req.params;
      const { title } = req.body;
      const updatedCategory = await CategoryModel.updateOne(
        { _id: id },
        { $set: { title } }
      );
      if (updatedCategory.matchedCount === 0)
        throw { status: 404, message: "category not found" };
      res.status(200).json({
        message: "category updated",
      });
    } catch (err) {
      next(err);
    }
  }
  async getAllCategories(req, res, next) {
    try {
      const allCategories = await CategoryModel.find({ parent: undefined });
      res.status(200).json({
        allCategories,
        messsage: "all categories",
      });
    } catch (err) {
      next(err);
    }
  }
  async getCategoryById(req, res, next) {
    try {
      const { id } = req.params;
      const category = await CategoryModel.findById(id);
      if (!category) throw { status: 404, messsage: "category not found" };
      res.status(200).json({
        message: "the category",
        data: category,
      });
    } catch (err) {
      next(err);
    }
  }
  async getAllParents(req, res, next) {
    try {
      const parentCategories = await CategoryModel.find({ parent: null });
      res.status(200).json({
        data: parentCategories,
        message: "all parent categories",
      });
    } catch (err) {
      next(err);
    }
  }
  async getAllChildrenByParent(req, res, next) {
    try {
      const parentId = req.params.parentId;
      const parent = await CategoryModel.findById(parentId);
      if (!parent) throw { status: 404, message: "parent not found" };
      const children = await CategoryModel.find({ parent: parentId });
      res.status(200).json({
        data: children,
        message: "all children",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = {
  CategoryController: new CategoryController(),
};
