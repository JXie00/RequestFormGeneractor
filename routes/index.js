const express = require("express");
const sql = require("mssql");

const router = express.Router();
const axios = require("axios");
const { response } = require("express");

router.use(express.json());
router.use(
  express.urlencoded({
    extended: true,
  })
);

let IsNew = true;

let pdfName = String;

router.get("/pdf/:PDFName", async (req, res) => {
  try {
    pdfName = req.params.PDFName;
    //regex format

    //petinfo
    const petInformation = await sql.query(
      `SELECT PatFirstName, PatDOB, PatSex From DBO.PathologyOrdering where RequestCode ='${pdfName}' `
    );
    let petInfo = petInformation.recordsets[0][0];
    let age = new Date();

    const days = Math.floor(
      (((age - petInfo.PatDOB) / 1000 / 3600 / 24) % 365) % 30
    );
    const months = Math.floor(
      (((age - petInfo.PatDOB) / 1000 / 3600 / 24) % 365) / 30
    );
    const years = Math.floor((age - petInfo.PatDOB) / 1000 / 3600 / 24 / 365);

    let animalName = petInfo.PatFirstName;

    let sex = petInfo.PatSex == "M" ? "Male" : "Female";
    console.log(years + " y", months + " m", days + " d", animalName, sex);

    //ownerInfo
    const ownerInformation = await sql.query(
      `SELECT Owner, Species, Breed, Desexed FROM DBO.Patients,DBO.PathologyOrdering where Patient# = P2kPatientID and  RequestCode = '${pdfName}'`
    );
    const ownerInfo = ownerInformation.recordsets[0][0];
    const Owner = ownerInfo.Owner;
    const Species = ownerInfo.Species;
    const Breed = ownerInfo.Breed;
    const Desexed = ownerInfo.Desexed;

    console.log(Owner, Species, Breed, Desexed);

    //ClinicInfo
    const ClinicInformation = await sql.query(
      `SELECT Surname,[First Name] as FirstName,[Address Line 1] as Address1, [Address Line 2] as Address2, Suburb, State, Postcode From DBO.Addresses as A, DBO.pathologyOrdering as P where A.ID = P.P2kAddressId and P.RequestCode = '${pdfName}'`
    );
    const ClinicInfo = ClinicInformation.recordsets[0][0];
    const ClinicDetails = ClinicInfo.Address1;
    const Address =
      ClinicInfo.Address2 +
      " " +
      ClinicInfo.Suburb +
      " ," +
      ClinicInfo.State +
      " " +
      ClinicInfo.Postcode;

    const surname = ClinicInfo.Surname;
    const FirstName = ClinicInfo.FirstName;
    console.log(ClinicDetails);
    console.log(Address);
  } catch (err) {
    console.log(err);
  }
});

//Post Request
router.post("/connect", async (req, res) => {
  //   pdfName = req.params.pdf;
  //   console.log(pdfName);

  const check = await sql.query(
    `SELECT ID FROM dbo.sampleindicator where requestCode ='${pdfName}' `
  );
  let ID = check.recordsets[0][0];
  ID == undefined ? (IsNew = true) : (IsNew = false);

  IsNew
    ? await sql.query(
        `INSERT INTO dbo.Sampleindicator(Requestcode) VALUES ('${pdfName}')`
      )
    : console.log("this form has already been modified");

  const results = await sql.query(
    `SELECT * FROM dbo.sampleindicator where RequestCode ='${pdfName}' `
  );

  res.json({
    confirmation: "success",
    data: IsNew,
  });
});

//Put Request
router.put("/update/:pdfNam", async (req, res) => {
  const pdfNam = req.params.pdfNam;
  const data = await sql.query(
    `SELECT * FROM dbo.sampleIndicator WHERE RequestCode = '${pdfNam}'`
  );
  let DBData = data.recordsets[0][0];

  const body = req.body;

  //   let XCoord = DBData.X_COORD;
  //   let YCoord = DBData.Y_COORD;
  //   let Radious = DBData.Radious;
  //   let ClinicalHistory = DBData.ClinicalHisotry;
  //   let Desciption = DBData.Desciption;
  //   let CytologyFindings = DBData.CytologyFidngs;
  //   let DifferentialDiag = DBData.DifferntialDiagonlse;
  const XCoord = body.XCoord;
  const YCoord = body.YCoord;
  const Radious = body.Radious;
  const ClinicalHistory = body.clinicalHistory;
  const Desciption = body.description;
  const CytologyFindings = body.cytologyFindings;
  const DifferentialDiag = body.differentialDiag;

  await sql.query(
    `UPDATE dbo.sampleindicator SET X_COORD = ${XCoord}, Y_COORD = ${YCoord}, Radious = ${Radious}, ClinicalHisotry = '${ClinicalHistory}',  Desciption = '${Desciption}', CytologyFidngs = '${CytologyFindings}',  DifferntialDiagonlse = '${DifferentialDiag}'   WHERE RequestCode = '${pdfNam}';`
  );

  res.json({
    status: "successful",
    data: await sql.query(
      `SELECT * FROM dbo.sampleIndicator where requestCode = '${pdfNam}' `
    ),
  });
});

module.exports = router;
