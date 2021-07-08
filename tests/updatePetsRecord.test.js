const { updatePetsRecord } = require("../controllers/newRecordController");
const DBdata = require("../database/retriveData");
const { mockResponse, mockRequest } = require("./mock");

let req, res;
jest.mock("../database/retriveData");

afterEach(() => {
  res = mockResponse();
  req = mockRequest();
  jest.fn().mockClear();
});

//valid data
let validData = {
  params: { requestCode: "US10674-DR28454" },
  body: {
    XCoord: 2,
    YCoord: 3,
    Radious: 4,
    clinicalHistory: "fefsd",
    description: "fefsdf",
    cytologyFindings: "23dsd",
    differentialDiag: "wdd",
  },
};

let expectedResponse = {
  XCoord: 2,
  YCoord: 3,
  Radious: 4,
  clinicalHistory: "fefsd",
  description: "fefsdf",
  cytologyFindings: "23dsd",
  differentialDiag: "wdd",
};

test("return 200 - properly update record", async () => {
  req = validData;
  DBdata.updateDBTable = jest.fn().mockReturnValue(200);
  DBdata.retriveCurrentPDFData = jest.fn().mockReturnValue(expectedResponse);
  await updatePetsRecord(req, res);
  expect(res.json).toHaveBeenCalledWith(expectedResponse);
});

test("return 404 - invald requestCode", async () => {
  let req = { params: { requestCode: "US10674-D4" } };
  await updatePetsRecord(req, res);
  expect(res.status).toHaveBeenCalledWith(404);
});

test("return 400 - entered invalid Data", async () => {
  await updatePetsRecord(req, res);
  expect(res.status).toHaveBeenCalledWith(400);
});
