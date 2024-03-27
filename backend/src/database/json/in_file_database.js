const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

module.exports = function inFileDatabase() {
  function readObjects() {
    let objectsString = fs.readFileSync("./companies.json");
    let objects = JSON.parse(objectsString);
    return objects;
  }

  function writeObjects(objects) {
    fs.writeFileSync("./companies.json", JSON.stringify(objects));
  }

  function addObject(object) {
    var objects = readObjects();
    var id = object.id;
    indexOfId = objects.indexOf(id);
    if (indexOfId != -1) {
      throw new Error("An object with this id already exists");
    }
    let uid = uuidv4();
    object["id"] = uid;
    objects.push(object);
    writeObjects(objects);
    return {
      added: true,
    };
  }

  function updateObject(object) {
    var objects = readObjects();
    var id = object.id;
    indexOfId = objects.indexOf(id);
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
    var id = object.id;
    indexOfId = objects.indexOf(id);
    if (indexOfId == -1) {
      throw new Error("Object not found");
    }
    objects = objects.splice(indexOfId, 1);
    writeObjects(objects);
    return {
      deleted: true,
    };
  }

  function getObject(id) {
    let objects = readObjects();
    indexOfId = objects.indexOf(id);
    if (indexOfId == -1) {
      throw new Error("Object not found");
    }
    let object = objects[indexOfId];
    return {
      found: true,
      object: object,
    };
  }

  function getAllObjects() {
    let objects = readObjects();
    return {
      found: true,
      objects: objects,
    };
  }

  return {
    addObject,
    updateObject,
    deleteObject,
    getObject,
    getAllObjects,
  };
};
