
/**
 * @swagger
 *  tags :
 *      name : dev routes
 *      description : developers APIs
 */

/**
 * @swagger
 * /dev/hash-password/{password}:
 *  get:
 *      summary : create hash value
 *      tags : [dev routes]
 *      description : hash generator
 *      parameters:
 *            - name : password
 *              in : path
 *              required : true
 *              description : password input
 *              type : string
 *      responses:
 *          200:
 *             description: Success
 *          500:
 *             description: Internal Server Error
 */

/**
 * @swagger
 * /dev/random-number/:
 *  get:
 *      summary : create a random number
 *      tags : [dev routes]
 *      description : random number generator
 *      responses:
 *          200:
 *             description: Success
 *          500:
 *             description: Internal Server Error
 */
