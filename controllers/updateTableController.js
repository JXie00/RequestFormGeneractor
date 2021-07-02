const express = require("express");
const router = express.Router();
const putRequestFuncs = require("../utilities/schemaValidation");
router.use(express.json());
router.use(
  express.urlencoded({
    extended: true,
  })
);
const DBdata = require("../database/retriveData");
const checkReferenceCodeFormat = require("../constants/regex");

updateTable = async (req, res) => {
  let isRequestCode;
  const requestCode = req.params.requestCode;
  checkReferenceCodeFormat.regex.test(requestCode)
    ? (isRequestCode = true)
    : (isRequestCode = false);
  if (isRequestCode) {
    try {
      const retriveDBData = await DBdata.retriveCurrentPDFData(requestCode);
      let storedData = retriveDBData.recordsets[0][0];
      //   let XCoord = DBData.X_COORD;
      //   let YCoord = DBData.Y_COORD;
      //   let Radious = DBData.Radious;
      //   let ClinicalHistory = DBData.ClinicalHisotry;
      //   let Desciption = DBData.Desciption;
      //   let CytologyFindings = DBData.CytologyFidngs;
      //   let DifferentialDiag = DBData.DifferntialDiagonlse;

      const { body } = req;

      if (putRequestFuncs.isValid(body)) {
        const XCoord = body.XCoord;
        const YCoord = body.YCoord;
        const Radious = body.Radious;
        const ClinicalHistory = body.clinicalHistory;
        const Desciption = body.description;
        const CytologyFindings = body.cytologyFindings;
        const DifferentialDiag = body.differentialDiag;

        await DBdata.updateDBTable(
          XCoord,
          YCoord,
          Radious,
          ClinicalHistory,
          Desciption,
          CytologyFindings,
          DifferentialDiag,
          requestCode
        );

        res.json({
          status: "successful",
          data: storedData,
        });
      } else {
        res.status(400).send("please enter valid data");
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(404).send("page could not be found");
  }
};
module.exports = updateTable;
