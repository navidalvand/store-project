const { CategoryController } = require('../../controllers/Admin/category.controller');

const router = require('express').Router();

/**
 * @swagger
 *  tags :
 *      name : category
 *      description : category management in panel admin
 */


/**
 * @swagger
 *  /admin/category/create:
 *      post:
 *          summary: create category in panel admin
 *          tags: [category]
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








module.exports = {
    categoryRoutes : router
}
