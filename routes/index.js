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

let requestCode = String;

let regex = new RegExp(/^(US|AU)[0-9]{3,5}[-]\w{2}\d{3,5}$/);
let isId = false;

router.get("/pdf/:PDFName", async (req, res) => {
  requestCode = req.params.PDFName;

  regex.test(requestCode) ? (isId = true) : (isId = false);

  if (isId == false) {
    res.status(404).send("page could not be found");
  } else {
    try {
      //petinfo
      const petInformation = await sql.query(
        `SELECT PatFirstName, PatDOB, PatSex From DBO.PathologyOrdering where RequestCode ='${requestCode}' `
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
      const patAge = `${years} y ${months} m ${days} d`;
      console.log(patAge, animalName, sex);

      //ownerInfo
      const ownerInformation = await sql.query(
        `SELECT Owner, Species, Breed, Desexed FROM DBO.Patients,DBO.PathologyOrdering where Patient# = P2kPatientID and  RequestCode = '${requestCode}'`
      );
      const ownerInfo = ownerInformation.recordsets[0][0];
      const owner = ownerInfo.Owner;
      const species = ownerInfo.Species;
      const breed = ownerInfo.Breed;
      const desexed = ownerInfo.Desexed;

      console.log(owner, species, breed, desexed);

      //ClinicInfo
      const ClinicInformation = await sql.query(
        `SELECT Surname,[First Name] as FirstName,[Address Line 1] as Address1, [Address Line 2] as Address2, Suburb, State, Postcode From DBO.Addresses as A, DBO.pathologyOrdering as P where A.ID = P.P2kAddressId and P.RequestCode = '${requestCode}'`
      );
      const ClinicInfo = ClinicInformation.recordsets[0][0];
      const clinicDetails = ClinicInfo.Address1;
      const address = `${ClinicInfo.Address2} ,${ClinicInfo.Suburb} ,${ClinicInfo.State} ${ClinicInfo.Postcode}`;

      const surname = ClinicInfo.Surname;
      const firstName = ClinicInfo.FirstName;
      const data = {
        Age: patAge,
        AnimalName: animalName,
        Sex: sex,
        Owner: owner,
        Species: species,
        Breed: breed,
        Desexed: desexed,
        ClinicDetails: clinicDetails,
        Address: address,
        Surname: surname,
        FirstName: firstName,
      };
      res.json(data);
    } catch (err) {
      res.send(err);
    }
  }
});

//Post Request
router.post("/connect", async (req, res) => {
  //   pdfName = req.params.pdf;
  //   console.log(pdfName);

  const check = await sql.query(
    `SELECT ID FROM dbo.sampleindicator where requestCode ='${requestCode}' `
  );
  let ID = check.recordsets[0][0];
  ID == undefined ? (IsNew = true) : (IsNew = false);

  IsNew
    ? await sql.query(
        `INSERT INTO dbo.Sampleindicator(Requestcode) VALUES ('${requestCode}')`
      )
    : console.log("this form has already been modified");

  const results = await sql.query(
    `SELECT * FROM dbo.sampleindicator where RequestCode ='${requestCode}' `
  );

  res.json({
    confirmation: "success",
    data: IsNew,
  });
});

//Put Request
router.put("/update/:pdfNam", async (req, res) => {
  const requestCode = req.params.pdfNam;
  const data = await sql.query(
    `SELECT * FROM dbo.sampleIndicator WHERE RequestCode = '${requestCode}'`
  );
  let DBData = data.recordsets[0][0];
  console.log(DBData);

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
    `UPDATE dbo.sampleindicator SET X_COORD = ${XCoord}, Y_COORD = ${YCoord}, Radious = ${Radious}, ClinicalHisotry = '${ClinicalHistory}',  Desciption = '${Desciption}', CytologyFidngs = '${CytologyFindings}',  DifferntialDiagonlse = '${DifferentialDiag}'   WHERE RequestCode = '${requestCode}';`
  );

  res.json({
    status: "successful",
    data: data,
  });
});

module.exports = router;
