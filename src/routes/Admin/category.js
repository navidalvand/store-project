const {
  CategoryController,
} = require("../../controllers/Admin/category.controller");

const router = require("express").Router();

router.post("/create", CategoryController.createCategory);
router.get("/all-parents", CategoryController.getAllParents);
router.get(
  "/get-children/:parentId",
  CategoryController.getAllChildrenByParent
);
router.get("/all", CategoryController.getAllCategories);
router.delete("/delete/:id", CategoryController.deleteCategory);
router.patch("/update/:id" , CategoryController.updateCategory)
router.get("/:id", CategoryController.getCategoryById)


module.exports = {
  categoryRoutes: router,
};
