const retrivePetsGeneralData = require("../controllers/fetchDataController");
const DBdata = require("../database/retriveData");
const { mockResponse, mockRequest } = require("./mock");

let res = mockResponse();
jest.mock("../database/retriveData");

afterEach(() => {
  res = mockResponse();
  // req = mockRequest();
  jest.fn().mockClear();
});

let req = { params: { requestCode: "US10674-DR28454" } };

// valid petinfo
let petInfo = {
  recordsets: [
    [{ PatDOB: "232323232232", PatFirstName: "Bessie", PatSex: "F" }],
  ],
};
//valid owner info
let owner = {
  recordsets: [
    [
      {
        Owner: "s Bell",
        Species: "Feline",
        Breed: "European Shorthair",
        Desexed: "Yes",
      },
    ],
  ],
};
// valid clinic info
let clinic = {
  recordsets: [
    [
      {
        Address2: "15-20 Main Street",
        Suburb: "RIPLEY",
        State: "QLD",
        Postcode: "4306",
        Address1: "Ripley Veterinary Hospital",
        Surname: "Hemming",
        FirstName: "Andrew",
      },
    ],
  ],
};
// expected response
let expectedResponse = {
  Age: "44 y 2 m 7 d",
  AnimalName: "Bessie",
  Sex: "Female",
  Owner: "s Bell",
  Species: "Feline",
  Breed: "European Shorthair",
  Desexed: "Yes",
  ClinicDetails: "Ripley Veterinary Hospital",
  ClinicAddress: "15-20 Main Street ,RIPLEY ,QLD 4306",
  VetSurname: "Hemming",
  VetFirstName: "Andrew",
};

test("return 200 - properly retrive data from DB", async () => {
  // arrange (setup)
  DBdata.retrivePetInfo = jest.fn().mockReturnValue(petInfo);
  DBdata.retriveOwnerInfo = jest.fn().mockReturnValue(owner);
  DBdata.retriveClinicInfo = jest.fn().mockReturnValue(clinic);

  // act
  await retrivePetsGeneralData(req, res);

  // assert
  expect(res.json).toHaveBeenCalledWith(expectedResponse);
});

test(" return 404 -invalid requestCode", async () => {
  let req = { params: { requestCode: "2dsdwdsd" } };

  await retrivePetsGeneralData(req, res);

  expect(res.status).toHaveBeenCalledWith(404);
});

test("return 400 - invalid PetData", async () => {
  // invalid petInfo
  let invalidPetData = {
    name: "wdwd",
  };
  DBdata.retrivePetInfo = jest.fn().mockReturnValue(invalidPetData);
  DBdata.retriveOwnerInfo = jest.fn().mockReturnValue(owner);
  DBdata.retriveClinicInfo = jest.fn().mockReturnValue(clinic);
  await retrivePetsGeneralData(req, res);
  expect(res.status).toHaveBeenCalledWith(400);
});

test("return 400 -invalid OwnerData", async () => {
  let req = { params: { requestCode: "US10674-DR28454" } };
  let invalidOwnerDta = {
    ansd: "23ds",
  };

  DBdata.retriveOwnerInfo = jest.fn().mockReturnValue(invalidOwnerDta);
  DBdata.retrivePetInfo = jest.fn().mockReturnValue(petInfo);
  DBdata.retriveClinicInfo = jest.fn().mockReturnValue(clinic);
  await retrivePetsGeneralData(req, res);
  expect(res.status).toHaveBeenCalledWith(400);
});

test("return 400 -invalid ClinicData", async () => {
  let req = { params: { requestCode: "US10674-DR28454" } };
  let invalidClinicData = {
    Address2: "15-20 Main Street",
    Suburb: "RIPLEY",
    State: "QLD",
    Postcode: "4306",
    Address1: "Ripley Veterinary Hospital",
    Surname: "Hemming",
    FirstName: "Andrew",
  };
  DBdata.retrivePetInfo = jest.fn().mockReturnValue(petInfo);
  DBdata.retriveOwnerInfo = jest.fn().mockReturnValue(owner);
  DBdata.retriveClinicInfo = jest.fn().mockReturnValue(invalidClinicData);

  await retrivePetsGeneralData(req, res);
  expect(res.status).toHaveBeenCalledWith(400);
});
