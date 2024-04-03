module.exports = function addCompany(dataController, requestObject) {
  const name = requestObject.getName();
  const address = requestObject.getAddress();
  const numberOfEmployees = requestObject.getNumberOfEmployees();

  const response = dataController.addObject({
    name: name,
    address: address,
    numberOfEmployees: numberOfEmployees,
  });

  return {
    status: 200,
    message: "The object have been added",
  };
};
