import { createNewPetsRecord } from "../controllers/newRecordController.js";
import DBdata from "../database/retriveData.js";
import { mockRequest, mockResponse } from "./mock.js";

let res = mockResponse();
jest.mock("../database/retriveData");

afterEach(() => {
  res = mockResponse();
  jest.fn().mockClear();
});
//valid requestCode
let req = { params: { requestCode: "US10674-DR28454" } };

// valid ID
let ID = {
  recordsets: [[undefined]],
};
let expectResponse = { confirmation: "succeed" };

test("return 200 - properly insert RequestCode", async () => {
  DBdata.checkPdfStatus = jest.fn().mockReturnValue(ID);
  await createNewPetsRecord(req, res);
  expect(res.json).toHaveBeenCalledWith(expectResponse);
});

test("return 404 - invalid requestcode", async () => {
  let req = { params: { requestCode: "US10674-D4" } };
  await createNewPetsRecord(req, res);
  expect(res.status).toHaveBeenCalledWith(404);
});

test("return 400 - there is an ID in DB", async () => {
  let ID = {
    recordsets: [
      [
        {
          ID: 2,
        },
      ],
    ],
  };
  DBdata.checkPdfStatus = jest.fn().mockReturnValue(ID);
  await createNewPetsRecord(req, res);
  expect(res.status).toHaveBeenCalledWith(400);
});

test("return 400 - undefined Data: missing recordsets", async () => {
  let ID = {
    ID: 2,
  };
  DBdata.checkPdfStatus = jest.fn().mockReturnValue(ID);
  await createNewPetsRecord(req, res);
  expect(res.status).toHaveBeenCalledWith(400);
});
