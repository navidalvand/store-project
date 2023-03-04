const Joi = require("@hapi/joi");
const authSchema = Joi.object({
  phone: Joi.string()
    .length(11)
    .required()
    .pattern(/^09[0-9]{9}$/)
    .error(new Error("phone number is not valid")),
});

module.exports = {
  authSchema,
};
