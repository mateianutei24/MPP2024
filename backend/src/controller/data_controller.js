module.exports = function dataController(database) {
  function addObject(object) {
    return database.addObject(object);
  }

  function updateObject(object) {
    return database.updateObject(object);
  }

  function deleteObject(object) {
    return database.deleteObject(object);
  }

  function getObject(id) {
    return database.getObject(id);
  }

  function getAllObjects() {
    return database.getAllObjects();
  }

  return {
    addObject,
    updateObject,
    deleteObject,
    getObject,
    getAllObjects,
  };
};
