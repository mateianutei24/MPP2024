const express = require("express");

module.exports = function companyRoutes(useCases, model) {
  const router = express.Router();

  router
    .route("/")
    .get(async (req, res, next) => {
      try {
        const getActiuneRequestObject = model.buildGetCompany(req.body);
        const response = useCases.getCompanyUseCase(getActiuneRequestObject);
        res.status(200).json(response);
      } catch (error) {
        next(error);
      }
    })
    .post(async (req, res, next) => {
      try {
        const addActiuneRequestObject = model.buildAddCompany(req.body);
        const response = useCases.addCompanyUseCase(addActiuneRequestObject);
        res.status(200).json(response);
      } catch (error) {
        error.message = "An error occured while adding";
        next(error);
      }
    })
    .patch(async (req, res, next) => {
      try {
        const updateActiuneRequestObject = model.buildUpdateCompany(req.body);
        const response = useCases.updateCompanyUseCase(
          updateActiuneRequestObject
        );
        res.status(200).json(response);
      } catch (error) {
        error.message = "An error occured while updating";
        next(error);
      }
    })
    .delete(async (req, res, next) => {
      try {
        const deleteActiuneRequestObject = model.buildDeleteCompany(req.body);
        const response = useCases.deleteCompanyUseCase(
          deleteActiuneRequestObject
        );
        res.status(200).json(response);
      } catch (error) {
        error.message = "An error occured while deleting";
        next(error);
      }
    });
  router.route("/getAll").get(async (req, res, next) => {
    try {
      const response = useCases.getAllCompaniesUseCase();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  });

  router.route("/sortAscByName").get(async (req, res, next) => {
    try {
      const response = useCases.sortAscByCompanyUseCase();
      res.status(200).json(response);
    } catch (error) {
      error.message = "An error occured while sorting";
      next(error);
    }
  });
  return router;
};
