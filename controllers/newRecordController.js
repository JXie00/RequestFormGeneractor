import DBdata from "../database/retriveData.js";
import checkReferenceCodeFormat from "../constants/regex.js";
import schemaValidation from "../utilities/schemaValidation.js";
import fillPDFForm from "../services/fillPDFService.js";

export const createNewPetsRecord = async (req, res) => {
  const { requestCode } = req.params;
  let isRequestCode = checkReferenceCodeFormat.test(requestCode);
  try {
    if (!isRequestCode) {
      return res.status(404).send("page could not be found");
    }
    const checkPdfStatus = await DBdata.checkPdfStatus(requestCode);
    let ID = checkPdfStatus.recordsets[0][0];

    if (ID != undefined) {
      return res.status(400).send("this file has already been modified");
    }
    await DBdata.insertRequestCode(requestCode);
    res.json({
      confirmation: "succeed",
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

export const updatePetsRecord = async (req, res) => {
  const { requestCode } = req.params;
  let isRequestCode = checkReferenceCodeFormat.test(requestCode);

  try {
    if (!isRequestCode) {
      return res.status(404).send("page could not be found");
    }

    const { body } = req;

    if (!schemaValidation.isValid(body)) {
      return res.status(400).send("please enter valid data");
    }

    const {
      XCoord,
      YCoord,
      Radious,
      clinicalHistory,
      description,
      cytologyFindings,
      differentialDiag,
    } = body;

    await DBdata.updateDBTable(
      XCoord,
      YCoord,
      Radious,
      clinicalHistory,
      description,
      cytologyFindings,
      differentialDiag,
      requestCode
    );

    const pdf = await fillPDFForm(
      XCoord,
      YCoord,
      Radious,
      clinicalHistory,
      description,
      cytologyFindings,
      differentialDiag,
      requestCode
    );

    res.status(200).send(pdf);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
