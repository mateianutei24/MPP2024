module.exports = function modelImplementation(validators) {
  const buildAddCompany = require("./requests/build_add_company");
  const buildDeleteCompany = require("./requests/build_delete_company");
  const buildGetCompany = require("./requests/build_get_company");
  const buildUpdateCompany = require("./requests/build_update_company");

  return {
    buildAddCompany: buildAddCompany(validators.addCompanyValidator),
    buildDeleteCompany: buildDeleteCompany(validators.deleteCompanyValidator),
    buildUpdateCompany: buildUpdateCompany(validators.updateCompanyValidator),
    buildGetCompany: buildGetCompany(validators.updateCompanyValidator),
  };
};
