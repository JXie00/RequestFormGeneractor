import retrivePetsGeneralData from "../../controllers/fetchGeneralDataController.js";
import DBdata from "../../database/retriveData.js";
import { mockResponse, mockRequest } from "../mock.js";

let res = mockResponse();
jest.mock("../../database/retriveData.js");

afterEach(() => {
  res = mockResponse();
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
        Owner: "test Owner",
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
        Address2: "15-20 test Street",
        Suburb: "infinity",
        State: "QLD",
        Postcode: "4000",
        Address1: "mock test Hospital",
        Surname: "tests",
        FirstName: "Andrew",
      },
    ],
  ],
};
// expected response
let expectedResponse = {
  Age: "44 y 4 m 8 d",
  AnimalName: "Bessie",
  Gender: "Female",
  OwnerName: "test Owner",
  Species: "Feline",
  Breed: "European Shorthair",
  Desexed: "Yes",
  ClinicName: "mock test Hospital",
  Address1: "15-20 test Street, infinity, QLD 4000",
  Surname: "tests",
  FirstName: "Andrew",
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
  expect(res.status).toHaveBeenCalledWith(404);
});

test("return 404, requestCode does not exist in DB", async () => {
  let undifinedPetInfo = {
    recordsets: [[undefined]],
  };

  DBdata.retrivePetInfo = jest.fn().mockReturnValue(undifinedPetInfo);
  DBdata.retriveOwnerInfo = jest.fn().mockReturnValue(owner);
  DBdata.retriveClinicInfo = jest.fn().mockReturnValue(clinic);
  await retrivePetsGeneralData(req, res);
  expect(res.status).toHaveBeenCalledWith(404);
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
  expect(res.status).toHaveBeenCalledWith(404);
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
  expect(res.status).toHaveBeenCalledWith(404);
});
