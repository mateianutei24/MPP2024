module.exports = function useCases(dataController) {
  //companie use Cases imports

  const addCompany = require("./company/addCompany");
  const deleteCompany = require("./company/deleteCompany");
  const getAllCompanies = require("./company/getAllCompanies");
  const getCompany = require("./company/getCompany");
  const updateCompany = require("./company/updateCompany");
  const sortAscByCompany = require("./company/sortAscByCompany");
  //puncte de lucru use cases imports
  return {
    // use cases pentru companii
    addCompanyUseCase: (requestObject) =>
      addCompany(dataController, requestObject),
    getAllCompaniesUseCase: (requestObject) =>
      getAllCompanies(dataController, requestObject),
    deleteCompanyUseCase: (requestObject) =>
      deleteCompany(dataController, requestObject),
    getCompanyUseCase: (requestObject) =>
      getCompany(dataController, requestObject),
    updateCompanyUseCase: (requestObject) =>
      updateCompany(dataController, requestObject),
    sortAscByCompanyUseCase: (requestObject) =>
      sortAscByCompany(dataController, requestObject),
    //use cases pentru puncte de lucru
  };
};
