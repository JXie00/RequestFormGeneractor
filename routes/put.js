const express = require("express");
const sql = require("mssql");
const router = express.Router();
const putRequestFuncs = require("../utilities/putRequestFunctions");
router.use(express.json());
router.use(
  express.urlencoded({
    extended: true,
  })
);
const checkReferenceCodeFormat = new RegExp(
  /^(US|AU)[0-9]{3,5}[-]\w{2}\d{3,5}$/
);
let isId = false;
//Put Request
router.put("/update/:requestCode", async (req, res) => {
  const requestCode = req.params.requestCode;
  checkReferenceCodeFormat.test(requestCode) ? (isId = true) : (isId = false);
  if (isId) {
    try {
      const data = await putRequestFuncs.retriveDBInfo(requestCode);
      let DBData = data.recordsets[0][0];
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

        await sql.query(
          `UPDATE dbo.sampleindicator SET X_COORD = ${XCoord}, Y_COORD = ${YCoord}, Radious = ${Radious}, ClinicalHisotry = '${ClinicalHistory}',  Desciption = '${Desciption}', CytologyFidngs = '${CytologyFindings}',  DifferntialDiagonlse = '${DifferentialDiag}'   WHERE RequestCode = '${requestCode}';`
        );

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
});

module.exports = router;
