module.exports = function deleteCompany(dataController, requestObject) {
  const id = requestObject.getId();
  return dataController.deleteObject({ id: id });
};
