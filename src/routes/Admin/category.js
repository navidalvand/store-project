const { CategoryController } = require('../../controllers/Admin/category.controller');

const router = require('express').Router();

/**
 * @swagger
 *  tags :
 *      name : admin-category
 *      description : category management in panel admin
 */


/**
 * @swagger
 *  /admin/category/create:
 *      post:
 *          summary: create category in panel admin
 *          tags: [admin-category]
 *          description: create category
 *          parameters:
 *                - in : formData
 *                  name : title
 *                  required : true
 *                  description : the category name
 *                  type : string
 *                - in : formData
 *                  name : parent
 *                  required : false
 *                  description : the parent category
 *                  type : string
 *          responses:
 *              201:
 *                 description: Created
 *              400:
 *                 description: Bad Request
 *              401:
 *                 description: UnAuthorization
 *              500:
 *                 description: Internal Server Error
 */

router.post('/create' , CategoryController.createCategory)


/**
 * @swagger
 *  /admin/category/all-parents:
 *      get:
 *          summary: get all parent categories in panel admin
 *          tags: [admin-category]
 *          description: get parent categories
 *          responses:
 *              200:
 *                 description: Success
 *              400:
 *                 description: Bad Request
 *              401:
 *                 description: UnAuthorization
 *              404:
 *                 description: Not Found
 */

router.get("/all-parents", CategoryController.getAllParents)

/**
 * @swagger
 *  /admin/category/get-children/{parentId}:
 *      get:
 *          summary: get all children categories by parent id
 *          tags: [admin-category]
 *          description: get all children
 *          parameters:
 *            - in : path
 *              name : parentId
 *              required : true
 *              type : string
 *          responses:
 *              200:
 *                 description: Success
 *              400:
 *                 description: Bad Request
 *              401:
 *                 description: UnAuthorization
 *              404:
 *                 description: Not Found
 */

router.get("/get-children/:parentId" , CategoryController.getAllChildrenByParent)


/**
 * @swagger
 *  /admin/category/all:
 *      get:
 *          summary: get all categories
 *          tags: [admin-category]
 *          description: get all categories
 *          responses:
 *              200:
 *                 description: Success
 *              400:
 *                 description: Bad Request
 *              401:
 *                 description: UnAuthorization
 *              404:
 *                 description: Not Found
 */

router.get("/all" , CategoryController.getAllCategories)


/**
 * @swagger
 *  /admin/category/delete/{id}:
 *      delete:
 *          summary: delete category by id
 *          tags: [admin-category]
 *          description: delete category
 *          parameters:
 *            - in : path
 *              name : id
 *              required : true
 *              type : string
 *          responses:
 *              200:
 *                 description: Success
 *              400:
 *                 description: Bad Request
 *              401:
 *                 description: UnAuthorization
 *              404:
 *                 description: Not Found
 */


router.delete("/delete/:id" , CategoryController.deleteCategory)


module.exports = {
    categoryRoutes : router
}
