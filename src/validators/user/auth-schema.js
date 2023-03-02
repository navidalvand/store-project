const Joi = require('@hapi/joi');
const authSchema = Joi.object({
    email: Joi.string().required().email().lowercase().trim(),
    password : Joi.string().trim().required().min(6).max(16)
})




module.exports = {
    authSchema
}
