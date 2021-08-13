import { updatePetsRecord } from "../controllers/newRecordController.js";
import DBdata from "../database/retriveData.js";
import { mockResponse, mockRequest } from "./mock.js";

let res = mockResponse();
jest.mock("../database/retriveData");

afterEach(() => {
  res = mockResponse();
  jest.fn().mockClear();
});

//valid data
let validData = {
  params: { requestCode: "US10674-DR28454" },
  body: {
    XCoord: 2,
    YCoord: 3,
    Radious: 4,
    clinicalHistory: "No history",
    description: "this pet is healthy",
    cytologyFindings: "No findings",
    differentialDiag: "nope",
  },
};

let expectedResponse = {
  recordsets: [
    [
      {
        ID: 22,
        XCoord: 2,
        YCoord: 3,
        Radious: 4,
        ClinicalHisotry: "No history",
        Desciption: "this pet is healthy",
        CytologyFidngs: "No findings",
        DifferntialDiagonlse: "nope",
        RequestCode: "US10674-DR28454",
      },
    ],
  ],
};

let expectdJSON = {
  ID: 22,
  XCoord: 2,
  YCoord: 3,
  Radious: 4,
  ClinicalHisotry: "No history",
  Desciption: "this pet is healthy",
  CytologyFidngs: "No findings",
  DifferntialDiagonlse: "nope",
  RequestCode: "US10674-DR28454",
};
test("return 200 - properly update record", async () => {
  let req = validData;
  DBdata.retriveCurrentPDFData = jest.fn().mockReturnValue(expectedResponse);
  await updatePetsRecord(req, res);
  expect(res.json).toHaveBeenCalledWith(expectdJSON);
});

test("return 404 - invald requestCode", async () => {
  let req = { params: { requestCode: "US10674-D4" } };
  await updatePetsRecord(req, res);
  expect(res.status).toHaveBeenCalledWith(404);
});

test("return 400 - entered invalid Data", async () => {
  let req = {
    params: { requestCode: "US10674-DR28454" },
    body: {
      XCoord: 2,
      YCoord: 3,
      Radious: "4",
      clinicalHistory: "No history",
      description: "this pet is healthy",
      cytologyFindings: "No findings",
      differentialDiag: "nope",
    },
  };
  await updatePetsRecord(req, res);
  expect(res.status).toHaveBeenCalledWith(400);
});

test("return 400 - undefined Data missing :missing recordsets", async () => {
  let req = validData;
  let undefinedData = {
    ID: 22,
    Xrd: 2,
    YCoord: 3,
    Radious: 4,
    ClinicalHisotry: "No history",
    Desciption: "this pet is healthy",
    CytologyFidngs: "No findings",
    DifferntialDiagonlse: "nope",
    RequestCode: "US10674-DR28454",
  };
  DBdata.retriveCurrentPDFData = jest.fn().mockReturnValue(undefinedData);
  await updatePetsRecord(req, res);
  expect(res.status).toHaveBeenCalledWith(400);
});
