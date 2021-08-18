import { afterEach, expect, jest, test } from "@jest/globals";
import fillPDFForm from "../controllers/fillPDF.js";
import * as fetchInitialData from "../utilities/fetchInitialData.js";
import { mockRequest, mockResponse } from "./mock.js";
import fs from "fs";

let res = mockResponse();
jest.mock("../utilities/fetchInitialData.js");
afterEach(() => {
  res = mockResponse();
  jest.fn().mockClear();
});

const APIreturnedData = {
  data: {
    Age: "44 y 3 m 17 d",
    AnimalName: "test",
    Sex: "Female",
    Owner: "test Owner",
    Species: "Feline",
    Breed: "European Shorthair",
    Desexed: "Yes",
    ClinicDetails: "mock test Hospital",
    ClinicAddress: "15-20 test Street ,infinity ,QLD 4000",
    VetSurname: "tests",
    VetFirstName: "Andrew",
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
