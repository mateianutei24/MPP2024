module.exports = function getCompany(dataController, requestObject) {
  const id = requestObject.getId();
  return dataController.getObject({ id: id });
};
