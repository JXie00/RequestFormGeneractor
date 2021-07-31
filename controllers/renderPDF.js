import { PDFDocument } from "pdf-lib";
import fs from "fs";

import onPDFLcationCalculation from "../utilities/onPDFLocationCalculation.js";

const fillPDFForm = async (
  xCoord,
  yCoord,
  radious
  // clinicalHistory,
  // description,
  // cytologyFindings,
  // differentialDiag
) => {
  const pdfDoc = await PDFDocument.load(
    fs.readFileSync("./constants/PDFen.pdf")
  );
  const page = pdfDoc.getPages()[0];

  await onPDFLcationCalculation(xCoord, yCoord, radious, page);
  // const fields = form.getFields();
  // fields.forEach((field) => {
  //   const type = field.constructor.name;
  //   const name = field.getName();
  //   console.log(`${type}: ${name}`);
  // });

  const form = pdfDoc.getForm();
  const ownerNameField = form.getTextField("OwnerName");
  const speciesField = form.getTextField("Species");
  const breedField = form.getTextField("Breed");
  const animalNameField = form.getTextField("AnimalName");
  const genderField = form.getTextField("Gender");
  const historyField = form.getTextField("History");
  const descriptionField = form.getTextField("Codes");
  const desexedField = form.getTextField("Desexed");
  const refNumberField = form.getTextField("RefNumber");
  const ClinicNameFiled = form.getTextField("ClinicName");
  const address1Field = form.getTextField("Address1");
  const firstnameField = form.getTextField("FirstName");
  const surnameField = form.getTextField("Surname");
  const ageField = form.getTextField("Age");
  const cytologyFindingsfield = form.getTextField("untitled34");
  const differentialDiagfield = form.getTextField("untitled35");

  // ageField.setText(data.Age);
  // animalNameField.setText(data.AnimalName);
  // genderField.setText(data.Sex);
  // ownerNameField.setText(data.Owner);
  // speciesField.setText(data.Species);
  // breedField.setText(data.Breed);
  // desexedField.setText(data.Desexed);
  // ClinicNameFiled.setText(data.ClinicDetails);
  // address1Field.setText(data.ClinicAddress);
  // surnameField.setText(data.VetSurname);
  // firstnameField.setText(data.VetFirstName);

  // historyField.setText(clinicalHistory);
  // descriptionField.setText(description);
  // cytologyFindingsfield.setText(cytologyFindings);
  // differentialDiagfield.setText(differentialDiag);

  const pdfByte = await pdfDoc.save({ updateFieldAppearances: true });

  fs.writeFileSync("./filled.pdf", pdfByte);
};
fillPDFForm("135, 362, 111, ", "36, 48, 257, ", 5);

export default fillPDFForm;
