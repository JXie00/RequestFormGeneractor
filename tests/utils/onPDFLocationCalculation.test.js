import { JestEnvironment } from "@jest/environment";
import { afterEach, expect, jest, test } from "@jest/globals";
import onPDFLcationCalculation from "../../utilities/onPDFLocationCalculation.js";
import fs from "fs";
import { PDFDocument } from "pdf-lib";

const mock = jest.fn();
mock("../../utilities/onPDFLocationCalculation.js");

afterEach(() => {
  jest.fn().mockClear();
});

let xCoord = "23,4,34,3";
let yCoord = "23,4,2,11";
let radious = 5;

test("properly calculates onPDF location", async () => {
  const pdfDoc = await PDFDocument.load(
    fs.readFileSync("./constants/PDFen.pdf")
  );
  const page = pdfDoc.getPages()[0];
  await onPDFLcationCalculation(xCoord, yCoord, radious, page);
  expect(mock).toBeCalled();
});

test("return if coordinates is empty", async () => {
  let xCoord = "";
  let yCoord = "";

  const pdfDoc = await PDFDocument.load(
    fs.readFileSync("./constants/PDFen.pdf")
  );
  const page = pdfDoc.getPages()[0];
  await onPDFLcationCalculation(xCoord, yCoord, radious, page);
  expect(mock).toReturn();
});

test("return if coordinates is NaN", async () => {
  let xCoord = "e";
  let yCoord = "e";
  const pdfDoc = await PDFDocument.load(
    fs.readFileSync("./constants/PDFen.pdf")
  );
  const page = pdfDoc.getPages()[0];
  await onPDFLcationCalculation(xCoord, yCoord, radious, page);
  expect(mock).toReturn();
});

test("return if yCoord is empty", async () => {
  let xCoord = "2";
  let yCoord = "";

  const pdfDoc = await PDFDocument.load(
    fs.readFileSync("./constants/PDFen.pdf")
  );
  const page = pdfDoc.getPages()[0];
  await onPDFLcationCalculation(xCoord, yCoord, radious, page);
  expect(mock).toReturn();
});

test("return if yCoord isNaN", async () => {
  let xCoord = "2";
  let yCoord = "TT";

  const pdfDoc = await PDFDocument.load(
    fs.readFileSync("./constants/PDFen.pdf")
  );
  const page = pdfDoc.getPages()[0];
  await onPDFLcationCalculation(xCoord, yCoord, radious, page);
  expect(mock).toReturn();
});
