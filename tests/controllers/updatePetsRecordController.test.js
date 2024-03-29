import { updatePetsRecord } from "../../controllers/newRecordController.js";
import DBdata from "../../database/retriveData.js";
import { mockResponse, mockRequest } from "../mock.js";

let res = mockResponse();
jest.mock("../../database/retriveData.js");
jest.mock("../../services/fillPDFService.js");

afterEach(() => {
  res = mockResponse();
  jest.fn().mockClear();
});

//valid data
let validData = {
  params: { requestCode: "AU10613-DR6209" },
  body: {
    XCoord: "22,34",
    YCoord: "32,44",
    Radious: 4,
    clinicalHistory: "No history",
    description: "this pet is healthy",
    cytologyFindings: "No findings",
    differentialDiag: "nope",
  },
};

test("return 200 - properly send PDF to client", async () => {
  let req = validData;
  await updatePetsRecord(req, res);
  expect(res.status).toHaveBeenCalledWith(200);
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
      xCoord: 2,
      YCoord: 3,
      Radius: "4",
      clinicalHistory: "No history",
      description: "this pet is healthy",
      cytologyFindings: "No findings",
      differentialDiag: "nope",
    },
  };
  await updatePetsRecord(req, res);
  expect(res.status).toHaveBeenCalledWith(400);
});

test("return 400 - undefined Data missing :missing body", async () => {
  let req = {
    params: { requestCode: "US10674-DR28454" },
    ody: {
      XCoord: "2",
      YCoord: "3",
      Radious: 4,
      clinicalHistory: "No history",
      description: "this pet is healthy",
      cytologyFindings: "No findings",
      differentialDiag: "nope",
    },
  };
  await updatePetsRecord(req, res);
  expect(res.status).toHaveBeenCalledWith(404);
});
