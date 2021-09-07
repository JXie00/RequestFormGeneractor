import { PDFDocument } from "pdf-lib";
import fs from "fs";
import onPDFLcationCalculation from "../utilities/onPDFLocationCalculation.js";
import { getDate } from "../utilities/getDate.js";
import fetchInitialData from "../utilities/fetchInitialData.js";

const fillPDFForm = async (
  xCoord,
  yCoord,
  radius,
  clinicalHistory,
  description,
  cytologyFindings,
  differentialDiag,
  requestCode
) => {
  const pdfDoc = await PDFDocument.load(
    fs.readFileSync("./constants/PDFen.pdf")
  );
  const page = pdfDoc.getPages()[0];
  await onPDFLcationCalculation(xCoord, yCoord, radius, page);
  const form = pdfDoc.getForm();

  //get all field of PDF, may use for future development
  // const fields = form.getFields();
  // fields.forEach((field) => {
  //   const type = field.constructor.name;
  //   const name = field.getName();
  //   console.log(`${type}: ${name}`);
  // });

  const cytologyFindingsfield = form.getTextField("untitled34");
  const differentialDiagfield = form.getTextField("untitled35");
  const dateField = form.getTextField("untitled26");
  const historyField = form.getTextField("History");
  const descriptionField = form.getTextField("Codes");
  const refNumberField = form.getTextField("RefNumber");

  const res = await fetchInitialData(requestCode);
  const { data } = res;
  for (let i = 0; i < Object.keys(data).length; i++) {
    form.getTextField(Object.keys(data)[i]).setText(Object.values(data)[i]);
  }

  refNumberField.setText(requestCode);
  historyField.setText(clinicalHistory);
  descriptionField.setText(description);
  cytologyFindingsfield.setText(cytologyFindings);
  differentialDiagfield.setText(differentialDiag);
  dateField.setText(getDate());

  const pdfByte = await pdfDoc.save({ updateFieldAppearances: true });
  return Buffer.from(pdfByte);
};

export default fillPDFForm;
