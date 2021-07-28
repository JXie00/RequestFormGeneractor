const { PDFDocument } = require("pdf-lib");
const fs = require("fs");

const fillPDFForm = async () => {
  const pdfDoc = await PDFDocument.load(
    fs.readFileSync("./constants/PDFen.pdf")
  );

  const form = pdfDoc.getForm();

  const fields = form.getFields();
  fields.forEach((field) => {
    const type = field.constructor.name;
    const name = field.getName();
    console.log(`${type}: ${name}`);
  });
  const ownerNameField = form.getTextField("OwnerName");
  const speciesField = form.getTextField("Species");
  const breedField = form.getTextField("Breed");
  const animalNameFiled = form.getTextField("AnimalName");
  const genderFiled = form.getTextField("Gender");
  const historyField = form.getTextField("History");
  const descriptionField = form.getTextField("Codes");
  const desexedField = form.getTextField("Desexed");
  const refNumberField = form.getTextField("RefNumber");
  const ClinicNameFiled = form.getTextField("ClinicName");
  const address1Field = form.getTextField("Address1");
  const firstnameField = form.getTextField("FirstName");
  const surnameField = form.getTextField("Surname");
  const ageField = form.getTextField("Age");

  refNumberField.setText("testing");
  ageField.setText("25");
  breedField.setText("this is a test");

  const pdfByte = await pdfDoc.save({ updateFieldAppearances: true });

  fs.writeFileSync("./filled.pdf", pdfByte);
};

module.exports = fillPDFForm;
