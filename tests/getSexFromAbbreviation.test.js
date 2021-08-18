import getSexFromAbbreviation from "../utilities/getSexFromAbbreviation.js";
import { afterEach, expect, jest, test } from "@jest/globals";

const mock = jest.fn();

mock("../utilities/getSexFromAbbreviation.js");

afterEach(() => {
  jest.fn().mockClear();
});

test("return male", () => {
  let sex = "M";
  expect(getSexFromAbbreviation(sex)).toEqual("Male");
});

test("return Female", () => {
  let sex = "F";
  expect(getSexFromAbbreviation(sex)).toEqual("Female");
});

test("return Unknown", () => {
  let sex = "U";
  expect(getSexFromAbbreviation(sex)).toEqual("Unknown");
});

test("retrun Other", () => {
  let sex = "O";
  expect(getSexFromAbbreviation(sex)).toEqual("Other");
});

test("return Neutrois", () => {
  let sex = "N";
  expect(getSexFromAbbreviation(sex)).toEqual("Neutrois");
});

test("return Intergender", () => {
  let sex = "I";
  expect(getSexFromAbbreviation(sex)).toEqual("Intergender");
});

test("return Unspecified", () => {
  let sex = "d";
  expect(getSexFromAbbreviation(sex)).toEqual("Unspecified");
});
