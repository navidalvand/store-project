const Joi = require("@hapi/joi");
const createHttpError = require("http-errors");

const createCategorySchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(24)
    .error(
      createHttpError.BadRequest(
        "min length must be 3 characters and max length must be 24 characters"
      )
    ),
  parent: Joi.string()
    .pattern(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
    .allow("")
    .error(createHttpError.BadRequest("the parent id pattern is wrong")),
});

module.exports = {
  createCategorySchema,
};
