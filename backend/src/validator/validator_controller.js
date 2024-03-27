const JoiValidator = (payload, schema) => {
  const { error } = schema.validate(payload);
  if (error) {
    const message = error.details.map((el) => el.message).join("\n");
    return {
      error: message,
    };
  }
  return true;
};

module.exports = function validator_controller() {
  // OBJECTS IMPORT //
  const addCompanySchema = require("./schemas/add_company_schema");
  const updateCompanySchema = require("./schemas/update_company_schema");
  const objectIdSchema = require("./schemas/object_id_schema");
  return {
    // OBJECTS VALIDATORS //
    addCompanyValidator: (payload) => JoiValidator(payload, addCompanySchema),
    updateCompanyValidator: (payload) =>
      JoiValidator(payload, updateCompanySchema),
    deleteCompanyValidator: (payload) => JoiValidator(payload, objectIdSchema),
    getCompanyValidator: (payload) => JoiValidator(payload, objectIdSchema),
  };
};
