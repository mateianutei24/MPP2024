function routesImport(useCases, model) {
  const companyRoutesImport = require("./routes/companyRoutes");

  return {
    companyRoutes: companyRoutesImport(useCases, model),
  };
}

module.exports = routesImport;
