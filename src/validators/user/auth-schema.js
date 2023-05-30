const Joi = require("@hapi/joi");
const createHttpError = require("http-errors");
const getOtpSchema = Joi.object({
  phone: Joi.string()
    .length(11)
    .pattern(/^09[0-9]{9}$/)
    .error(createHttpError.BadRequest("wrong phone number")),
});

const checkOtpSchema = Joi.object({
  phone: Joi.string()
    .length(11)
    .pattern(/^09[0-9]{9}$/)
    .error(createHttpError.BadRequest("wrong phone number")),
  code: Joi.string().min(5).max(5).error(new Error("code is wrong")),
});

module.exports = {
  getOtpSchema,
  checkOtpSchema,
};
