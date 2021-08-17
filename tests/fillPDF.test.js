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
    AnimalName: "Bessie",
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

let XCoord = "23,12,434,3";
let YCoord = "23,23,2,32";
let radious = 5;
let clinicalHistory = "";
let description = "";
let cytologyFindings = "";
let differentialDiag = "";
let requestCode = "AU10721-DR5096";

test("properly manipulate PDF", async () => {
  fetchInitialData.default = jest.fn().mockReturnValue(APIreturnedData);
  await fillPDFForm(
    XCoord,
    YCoord,
    radious,
    clinicalHistory,
    description,
    cytologyFindings,
    differentialDiag,
    requestCode
  );

  expect(fillPDFForm.length).toEqual(8);
});
