const { createNewPetsRecord } = require("../controllers/newRecordController");
const DBdata = require("../database/retriveData");
const { mockRequest, mockResponse } = require("./mock");

let res = mockResponse();
jest.mock("../database/retriveData");

afterEach(() => {
  res = mockResponse();
  jest.fn().mockClear();
});
//valid requestCode
let req = { params: { requestCode: "US10674-DR28454" } };

// valid ID
let ID = undefined;

test("return 200 - properly insert RequestCode", async () => {
  DBdata.checkPdfStatus = jest.fn().mockReturnValue(ID);
  await createNewPetsRecord(req, res);
  expect(res.status).toHaveBeenCalledWith(200);
});

test("return 404 - invalid requestcode", async () => {
  let req = { params: { requestCode: "US10674-D4" } };
  await createNewPetsRecord(req, res);
  expect(res.status).toHaveBeenCalledWith(404);
});

test("return 400 - ID Defined", async () => {
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
