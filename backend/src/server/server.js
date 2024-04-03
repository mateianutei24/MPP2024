const express = require("express");
const cors = require("cors");

module.exports = function server(useCases, model) {
  const app = express();
  app.use(express.json());
  app.use(cors());
  const PORT = 5800;

  const routesImport = require("./routes_import");
  const routes = routesImport(useCases, model);

  app.use("/company", routes.companyRoutes);

  app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.code || 500);
    res.send({
      error: {
        status: err.code || 500,
        message: err.message,
      },
    });
  });

  function run() {
    app.listen(PORT, () => {
      console.log(`up and running on ${PORT}`);
    });
  }

  return { run };
};
