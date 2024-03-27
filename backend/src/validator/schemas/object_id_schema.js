const Joi = require("joi");

module.exports = Joi.object().keys({
  id: Joi.string()
    .strict()
    .error(() => {
      var error = new Error("Incorect company id");
      error.code = 400;
      throw error;
    }),
});
