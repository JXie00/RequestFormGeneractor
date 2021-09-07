import { afterEach, expect, jest, test } from "@jest/globals";
import fillPDFForm from "../../services/fillPDFService.js";
import * as fetchInitialData from "../../utilities/fetchInitialData.js";
import { mockRequest, mockResponse } from "../mock.js";
import fs from "fs";

let res = mockResponse();
jest.mock("../../utilities/fetchInitialData.js");
afterEach(() => {
  res = mockResponse();
  jest.fn().mockClear();
});

const APIreturnedData = {
  data: {
    Age: "44 y 3 m 17 d",
    AnimalName: "test",
    Gender: "Female",
    OwnerName: "test Owner",
    Species: "Feline",
    Breed: "European Shorthair",
    Desexed: "Yes",
    ClinicName: "mock test Hospital",
    Address1: "15-20 test Street ,infinity ,QLD 4000",
    Surname: "tests",
    FirstName: "Andrew",
  },
};

let XCoord = "";
let YCoord = "";
let radious = 5;
let clinicalHistory = "";
let description = "";
let cytologyFindings = "";
let differentialDiag = "";
let requestCode = "AU10613-DR4983";

test("properly manipulate PDF", async () => {
  fetchInitialData.default = jest.fn().mockReturnValue(APIreturnedData);

  const pdf = await fillPDFForm(
    XCoord,
    YCoord,
    radious,
    clinicalHistory,
    description,
    cytologyFindings,
    differentialDiag,
    requestCode
  );
  fs.writeFileSync("./test.pdf", pdf);
  const testPDf = fs.readFileSync("./test.pdf");
  expect(pdf).toStrictEqual(testPDf);
});
