const express = require("express");
const router = express.Router();
const putRequestFuncs = require("../utilities/putRequestFunctions");
router.use(express.json());
router.use(
  express.urlencoded({
    extended: true,
  })
);
const DBdata = require("../database/retriveData");
const checkReferenceCodeFormat = require("../constants/regex");

updateTable = async (req, res) => {
  let isId = false;
  const requestCode = req.params.requestCode;
  checkReferenceCodeFormat.regex.test(requestCode)
    ? (isId = true)
    : (isId = false);
  if (isId) {
    try {
      const retriveDBData = await DBdata.retriveCurrentPDFData(requestCode);
      let DBData = retriveDBData.recordsets[0][0];
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

        const updateTable = await DBdata.updateTable;

        res.json({
          status: "successful",
          data: DBData,
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
