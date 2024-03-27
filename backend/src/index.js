const serverImport = require("./server/server");
const validatorsImport = require("./validator/validator_controller");
const modelImport = require("./model/modelImplementation");
const dataControllerImport = require("./controller/data_controller");
const useCasesImport = require("./useCases/useCases");
const databaseImport = require("./database/json/in_file_database");
function main() {
  const database = databaseImport();
  const dataController = dataControllerImport(database);
  const useCases = useCasesImport(dataController);
  const validators = validatorsImport();
  const model = modelImport(validators);
  const server = serverImport(useCases, model);

  server.run();
}

main();
