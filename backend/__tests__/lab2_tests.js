const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const inFileDatabase = require("../src/database/json/in_file_database");

jest.mock("fs", () => ({
  readFileSync: jest.fn(),
  writeFileSync: jest.fn(),
}));

describe("inFileDatabase Adapter Test", () => {
  beforeEach(() => {
    // Reset the mocked functions before each test
    fs.readFileSync.mockClear();
    fs.writeFileSync.mockClear();
  });

  describe("addObject", () => {
    it("should add an object to the database", () => {
      const mockObjects = [
        {
          name: "Company2",
          address: "Test Address2",
          numberOfEmployees: 4,
          id: "4f9dd0f8-e8b4-46a9-8a6b-27b56446a388",
        },
      ];
      fs.readFileSync.mockReturnValue(JSON.stringify(mockObjects));

      const newObject = {
        name: "Company3",
        address: "Test Address3",
        numberOfEmployees: 10,
        id: "567dd0f8-e8b4-46a9-8a6b-27b56446a388",
      };
      inFileDatabase().addObject(newObject);

      expect(fs.writeFileSync).toHaveBeenCalledTimes(1);

      const writtenObjects = JSON.parse(fs.writeFileSync.mock.calls[0][1]);
      expect(writtenObjects).toContainEqual(expect.objectContaining(newObject));
    });
  });

  describe("updateObject", () => {
    it("should update an object in the database", () => {
      const mockObjects = [
        {
          name: "Company2",
          address: "Test Address2",
          numberOfEmployees: 4,
          id: "4f9dd0f8-e8b4-46a9-8a6b-27b56446a388",
        },
      ];
      fs.readFileSync.mockReturnValue(JSON.stringify(mockObjects));

      const updatedObject = {
        name: "Company2 Updated",
        address: "Test Address2",
        numberOfEmployees: 4,
        id: "4f9dd0f8-e8b4-46a9-8a6b-27b56446a388",
      };
      inFileDatabase().updateObject(updatedObject);

      expect(fs.writeFileSync).toHaveBeenCalledTimes(1);

      const writtenObjects = JSON.parse(fs.writeFileSync.mock.calls[0][1]);
      expect(writtenObjects).toContainEqual(
        expect.objectContaining(updatedObject)
      );
    });

    it("should throw an error if object not found", () => {
      const mockObjects = [
        {
          name: "Company2 Updated",
          address: "Test Address2",
          numberOfEmployees: 4,
          id: "4f9dd0f8-e8b4-46a9-8a6b-27b56446a388",
        },
      ];
      fs.readFileSync.mockReturnValue(JSON.stringify(mockObjects));

      const updatedObject = {
        name: "Company2 Updated",
        address: "Test Address2",
        numberOfEmployees: 5,
        id: "4f9dd0f8-e8b4-46a9-8a6b-27b5644622",
      };
      expect(() => inFileDatabase().updateObject(updatedObject)).toThrowError(
        "Object not found"
      );
    });
  });

  describe("getObject", () => {
    it("should return the object with the specified id", () => {
      const mockObjects = [
        {
          name: "Test",
          address: "Test Address",
          numberOfEmployees: 4,
          id: "08f226f8-e69f-4386-983c-41cd5a9edc29",
        },
        {
          name: "Test1",
          address: "Test Address",
          numberOfEmployees: 4,
          id: "4f9dd0f8-e8b4-46a9-8a6b-27b56446a388",
        },
      ];
      fs.readFileSync.mockReturnValue(JSON.stringify(mockObjects));

      const objectId = { id: "08f226f8-e69f-4386-983c-41cd5a9edc29" };
      const result = inFileDatabase().getObject(objectId);

      expect(result.found).toBe(true);
      expect(result.object).toEqual({
        name: "Test",
        address: "Test Address",
        numberOfEmployees: 4,
        id: "08f226f8-e69f-4386-983c-41cd5a9edc29",
      });
    });

    it("should throw an error if object not found", () => {
      const mockObjects = [
        {
          name: "Test",
          address: "Test Address",
          numberOfEmployees: 4,
          id: "08f226f8-e69f-4386-983c-41cd5a9edc29",
        },
      ];
      fs.readFileSync.mockReturnValue(JSON.stringify(mockObjects));

      const objectId = { id: "4f9dd0f8-e8b4-46a9-8a6b-27b5644622" };
      expect(() => inFileDatabase().getObject(objectId)).toThrowError(
        "Object not found"
      );
    });
  });

  describe("getAllObjects", () => {
    it("should return all objects from the database", () => {
      const mockObjects = [
        {
          name: "Test",
          address: "Test Address",
          numberOfEmployees: 4,
          id: "08f226f8-e69f-4386-983c-41cd5a9edc29",
        },
        {
          name: "Test1",
          address: "Test Address",
          numberOfEmployees: 4,
          id: "4f9dd0f8-e8b4-46a9-8a6b-27b56446a388",
        },
      ];
      fs.readFileSync.mockReturnValue(JSON.stringify(mockObjects));

      const result = inFileDatabase().getAllObjects();

      expect(result.found).toBe(true);
      expect(result.objects).toEqual(mockObjects);
    });
  });

  describe("deleteObject", () => {
    it("should delete the object with the specified id", () => {
      const mockObjects = [
        {
          name: "Test",
          address: "Test Address",
          numberOfEmployees: 4,
          id: "08f226f8-e69f-4386-983c-41cd5a9edc29",
        },
        {
          name: "Test1",
          address: "Test Address",
          numberOfEmployees: 4,
          id: "4f9dd0f8-e8b4-46a9-8a6b-27b56446a388",
        },
      ];
      fs.readFileSync.mockReturnValue(JSON.stringify(mockObjects));

      const objectId = { id: "08f226f8-e69f-4386-983c-41cd5a9edc29" };
      inFileDatabase().deleteObject(objectId);

      expect(fs.writeFileSync).toHaveBeenCalledTimes(1);

      const writtenObjects = JSON.parse(fs.writeFileSync.mock.calls[0][1]);
      expect(writtenObjects).not.toContainEqual(
        expect.objectContaining({
          name: "Test",
          address: "Test Address",
          numberOfEmployees: 4,
          id: "08f226f8-e69f-4386-983c-41cd5a9edc29",
        })
      );
    });

    it("should throw an error if object not found", () => {
      const mockObjects = [{ id: "1", name: "Object 1" }];
      fs.readFileSync.mockReturnValue(JSON.stringify(mockObjects));

      const objectId = { id: "2" };
      expect(() => inFileDatabase().deleteObject(objectId)).toThrowError(
        "Object not found"
      );
    });
  });

  describe("filter ascending by name", () => {
    it("should filter data by name in ascending order", () => {
      const mockObjects = [
        {
          name: "Test",
          address: "Test Address",
          numberOfEmployees: 4,
          id: "08f226f8-e69f-4386-983c-41cd5a9edc29",
        },
        {
          name: "ASD",
          address: "Test Address",
          numberOfEmployees: 4,
          id: "4f9dd0f8-e8b4-46a9-8a6b-27b56446a388",
        },
      ];
      fs.readFileSync.mockReturnValue(JSON.stringify(mockObjects));

      const response = inFileDatabase().sortAscByName();

      expect(response.found).toBe(true);
      expect(response.objects).toEqual([
        {
          name: "ASD",
          address: "Test Address",
          numberOfEmployees: 4,
          id: "4f9dd0f8-e8b4-46a9-8a6b-27b56446a388",
        },
        {
          name: "Test",
          address: "Test Address",
          numberOfEmployees: 4,
          id: "08f226f8-e69f-4386-983c-41cd5a9edc29",
        },
      ]);
    });
  });
});
