import { fillInStoredData } from "../controllers/fetchStoredData.js";
import DBdata from "../database/retriveData.js";
import { mockRequest, mockResponse } from "./mock.js";

let res = mockResponse();
jest.mock("../database/retriveData.js");

afterEach(() => {
  res = mockResponse();
  jest.fn().mockClear();
});

//valid requestCode
let req = { params: { requestCode: "US10674-DR28454" } };

//valid id
let ID = {
  recordsets: [
    [
      {
        ID: 22,
      },
    ],
  ],
};
// expectedReponse
let expectedResponse = {
  recordsets: [
    [
      {
        ID: 22,
        X_COORD: "232,23,334",
        Y_COORD: "322,23,23",
        Radious: 5,
        ClinicalHisotry: "3 '",
        Desciption: "yo ",
        CytologyFidngs: "noenddd,g,d s",
        DifferntialDiagonlse: "abceweewe23w,w, edd",
        RequestCode: "AU10613-DR4983",
      },
    ],
  ],
};

test("return 200 - properly retrive data from DB", async () => {
  DBdata.checkPdfStatus = jest.fn().mockReturnValue(ID);
  DBdata.retriveCurrentPDFData = jest.fn().mockReturnValue(expectedResponse);
  await fillInStoredData(req, res);
  expect(res.status).toHaveBeenCalledWith(200);
});

test("return 404 - invalid requestCode", async () => {
  let req = { params: { requestCode: "2dsdwdsd" } };
  await fillInStoredData(req, res);
  expect(res.status).toHaveBeenCalledWith(404);
});

test("return empty - ID is undefined", async () => {
  let ID = {
    recordsets: [[undefined]],
  };
  DBdata.checkPdfStatus = jest.fn().mockReturnValue(ID);
  await fillInStoredData(req, res);
  expect(res.json).toHaveBeenCalledWith("");
});

test("return 400 - catch error requestCode not exist in DB", async () => {});
