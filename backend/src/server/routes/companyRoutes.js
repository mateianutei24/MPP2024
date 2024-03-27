const express = require("express");

module.exports = function companyRoutes(useCases, model) {
  const router = express.Router();

  router
    .route("/")
    .get(async (req, res, next) => {
      try {
        const getActiuneRequestObject = model.buildGetCompany(req.body);
        res.status(200).send(response);
      } catch (error) {
        next(error);
      }
    })
    .post(async (req, res, next) => {
      try {
        const addActiuneRequestObject = model.buildAddCompany(req.body);
        res.status(200).send(response);
      } catch (error) {
        next(error);
      }
    })
    .patch(async (req, res, next) => {
      try {
        const updateActiuneRequestObject = model.buildUpdateCompany(req.body);
        res.status(200).send("Nisa updatata cu succes");
      } catch (error) {
        next(error);
      }
    })
    .delete(async (req, res, next) => {
      try {
        const deleteActiuneRequestObject = model.buildDeleteCompany(req.body);
      } catch (error) {
        next(error);
      }
    });
  router.route("/getAll").get(async (req, res, next) => {
    try {
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  });
  return router;
};
