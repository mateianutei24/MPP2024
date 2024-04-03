const Joi = require("joi");

module.exports = Joi.object().keys({
  id: Joi.string()
    .strict()
    .error(() => {
      var error = new Error("Incorect company id");
      error.code = 400;
      throw error;
    }),
  name: Joi.string()
    .strict()
    .error(() => {
      var error = new Error("Incorect company name");
      error.code = 400;
      throw error;
    }),
  address: Joi.string()
    .strict()
    .error(() => {
      var error = new Error("Incorect address");
      error.code = 400;
      throw error;
    }),
  numberOfEmployees: Joi.number()
    .strict()
    .error(() => {
      var error = new Error("Incorect number of employees");
      error.code = 400;
      throw error;
    }),
});
