module.exports = function updateCompany(dataController, requestObject) {
  const response = dataController.updateObject({
    id: requestObject.getId(),
    name: requestObject.getName(),
    address: requestObject.getAddress(),
    numberOfEmployees: requestObject.getNumberOfEmployees(),
  });
  return response;
};
