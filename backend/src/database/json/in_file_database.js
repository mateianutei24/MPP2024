const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

module.exports = function inFileDatabase() {
  function findIndexOfId(objects, id) {
    if (!objects || !id) {
      return -1;
    }
    for (let i = 0; i < objects.length; i++) {
      if (objects[i].id == id) {
        return i;
      }
    }
    return -1;
  }

  function readObjects() {
    let objectsString = fs.readFileSync(
      "C:\\Users\\matei\\OneDrive\\Desktop\\mpp\\backend\\src\\database\\json\\companies.json"
    );
    let objects = JSON.parse(objectsString);
    return objects;
  }

  function writeObjects(objects) {
    fs.writeFileSync(
      "C:\\Users\\matei\\OneDrive\\Desktop\\mpp\\backend\\src\\database\\json\\companies.json",
      JSON.stringify(objects)
    );
  }

  function addObject(object) {
    var objects = readObjects();
    let uid = uuidv4();
    object["id"] = uid;
    objects.push(object);
    writeObjects(objects);
    return {
      added: true,
    };

    //log error somewhere
  }

  function updateObject(object) {
    var objects = readObjects();
    const indexOfId = findIndexOfId(objects, object.id);
    if (indexOfId == -1) {
      throw new Error("Object not found");
    }

    objects[indexOfId] = object;
    writeObjects(objects);
    return {
      updated: true,
    };
  }

  function deleteObject(object) {
    var objects = readObjects();
    indexOfId = findIndexOfId(objects, object.id);
    if (indexOfId == -1) {
      throw new Error("Object not found");
    }
    objects.splice(indexOfId, 1);
    writeObjects(objects);
    return {
      deleted: true,
    };
  }

  function getObject(object) {
    let objects = readObjects();
    indexOfId = findIndexOfId(objects, object.id);
    if (indexOfId == -1) {
      throw new Error("Object not found");
    }
    let objectResponse = objects[indexOfId];
    return {
      found: true,
      object: objectResponse,
    };
  }

  function getAllObjects() {
    let objects = readObjects();
    return {
      found: true,
      objects: objects,
    };
  }

  function sortAscByName() {
    let objects = readObjects();
    const sortedData = objects.sort((a, b) => {
      const nameA = a.name;
      const nameB = b.name;
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    return {
      found: true,
      objects: sortedData,
    };
  }

  return {
    addObject,
    updateObject,
    deleteObject,
    getObject,
    getAllObjects,
    sortAscByName,
  };
};
