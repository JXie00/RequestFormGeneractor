const retrivePetsGeneralData = require("../controllers/fetchDataController");
const DBdata = require("../database/retriveData");
const { mockResponse, mockRequest } = require("./mock");

jest.mock("../database/retriveData");
beforeEach(() => {
  // DBdata.MockReset();
});

test("properly retrive data from DB", async () => {
  // arrange (setup)
  let req = { params: { requestCode: "US10674-DR28454" } };
  let res = mockResponse();

  // valid petinfo
  let petInfo = {
    recordsets: [[{ Age: "23y 4m 7d", AnimalName: "Bessie", Sex: "Female" }]],
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
          ClinicDetails: "Ripley Veterinary Hospital",
          ClinicAddress: "15-20 Main Street ,RIPLEY ,QLD 4306",
          VetSurname: "Hemming",
          VetFirstName: "Andrew",
        },
      ],
    ],
  };
  // expected response
  let expectedResponse = {
    Age: "3 y 4 m 7 d",
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

  DBdata.retrivePetInfo = jest.fn().mockReturnValue(petInfo);
  DBdata.retriveOwnerInfo = jest.fn().mockReturnValue(owner);
  DBdata.retriveClinicInfo = jest.fn().mockReturnValue(clinic);

  // act
  await retrivePetsGeneralData(req, res);

  // assert
  expect(res.json).toHaveBeenCalledWith(expectedResponse);
});
