const DBdata = require("../database/retriveData");
const checkReferenceCodeFormat = require("../constants/regex");
const schemaValidation = require("../utilities/schemaValidation");
const fillPDFForm = require("./renderPDF");

const createNewPetsRecord = async (req, res) => {
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

const updatePetsRecord = async (req, res) => {
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

    const retriveDBData = await DBdata.retriveCurrentPDFData(requestCode);
    let storedData = retriveDBData.recordsets[0][0];

    await fillPDFForm();
    // const {
    //   X_COORD,
    //   Y_COORD,
    //   Radious,
    //   ClinicalHisotry,
    //   Desciption,
    //   CytologyFidngs,
    //   DifferntialDiagonlse,
    // } = DBdata;

    // res.status(200).send("succeed");
    res.json(storedData);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

module.exports = { createNewPetsRecord, updatePetsRecord };
