const express = require("express");
const sql = require("mssql");

const router = express.Router();
const axios = require("axios");
const { response } = require("express");
const e = require("express");

router.use(express.json());
router.use(
  express.urlencoded({
    extended: true,
  })
);

let checkReferenceCodeFormat = new RegExp(/^(US|AU)[0-9]{3,5}[-]\w{2}\d{3,5}$/);
let isId = false;

router.get("/pdf/:requestCode", async (req, res) => {
  const requestCode = req.params.requestCode;

  checkReferenceCodeFormat.test(requestCode) ? (isId = true) : (isId = false);

  if (isId == false) {
    res.status(404).send("page could not be found");
  } else {
    try {
      //petinfo
      const petInformation = await sql.query(
        `SELECT PatFirstName, PatDOB, PatSex From DBO.PathologyOrdering where RequestCode ='${requestCode}' `
      );

      let petInfo = petInformation.recordsets[0][0];

      function ageCalulation() {
        let age = new Date();
        const days = Math.floor(
          (((age - petInfo.PatDOB) / 1000 / 3600 / 24) % 365) % 30
        );
        const months = Math.floor(
          (((age - petInfo.PatDOB) / 1000 / 3600 / 24) % 365) / 30
        );
        const years = Math.floor(
          (age - petInfo.PatDOB) / 1000 / 3600 / 24 / 365
        );
        return `${years} y ${months} m ${days} d`;
      }

      let animalName = petInfo.PatFirstName;
      let sex = petInfo.PatSex;
      switch (sex) {
        case "M":
          sex = "Male";
          break;
        case "F":
          sex = "Female";
          break;
        case "U":
          sex = "Unknown";
          break;
        case "O":
          sex = "Other";
          break;
        case "N":
          sex = "Neutrois";
          break;
        case "I":
          sex = "Intergender";
          break;
      }

      async function retriveOwnerInfo() {
        let ownerInformation = await sql.query(
          `SELECT Owner, Species, Breed, Desexed FROM DBO.Patients,DBO.PathologyOrdering where Patient# = P2kPatientID and  RequestCode = '${requestCode}'`
        );
        return ownerInformation;
      }

      async function retriveClinicInfo() {
        const ClinicInformation = await sql.query(
          `SELECT Surname,[First Name] as FirstName,[Address Line 1] as Address1, [Address Line 2] as Address2, Suburb, State, Postcode From DBO.Addresses as A, DBO.pathologyOrdering as P where A.ID = P.P2kAddressId and P.RequestCode = '${requestCode}'`
        );
        return ClinicInformation;
      }

      //ownerInfo
      const ownerInformation = await retriveOwnerInfo();
      const ownerInfo = ownerInformation.recordsets[0][0];
      const owner = ownerInfo.Owner;
      const species = ownerInfo.Species;
      const breed = ownerInfo.Breed;
      const desexed = ownerInfo.Desexed;

      console.log(owner, species, breed, desexed);

      //ClinicInfo
      const ClinicInformation = await retriveClinicInfo();
      const ClinicInfo = ClinicInformation.recordsets[0][0];
      const clinicDetails = ClinicInfo.Address1;
      const address = `${ClinicInfo.Address2} ,${ClinicInfo.Suburb} ,${ClinicInfo.State} ${ClinicInfo.Postcode}`;

      const surname = ClinicInfo.Surname;
      const firstName = ClinicInfo.FirstName;
      const data = {
        Age: ageCalulation(),
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
router.post("/connect/:requestCode", async (req, res) => {
  const requestCode = req.params.requestCode;
  checkReferenceCodeFormat.test(requestCode) ? (isId = true) : (isId = false);

  if (isId == false) {
    res.status(404).send("page could not be found");
  } else {
    const check = await sql.query(
      `SELECT ID FROM dbo.sampleindicator where requestCode ='${requestCode}' `
    );
    let ID = check.recordsets[0][0];
    if (ID == undefined) {
      await sql.query(
        `INSERT INTO dbo.Sampleindicator(Requestcode) VALUES ('${requestCode}')`
      );

      // const results = await sql.query(
      //   `SELECT * FROM dbo.sampleindicator where RequestCode ='${requestCode}' `
      // );
    } else {
      console.log("this file has already been modified");
    }

    res.json({
      confirmation: "success",
    });
  }
});

//Put Request
router.put("/update/:requestCode", async (req, res) => {
  const requestCode = req.params.requestCode;
  checkReferenceCodeFormat.test(requestCode) ? (isId = true) : (isId = false);

  if (isId == false) {
    res.status(404).send("page could not be found");
  } else {
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
      data: DBData,
    });
  }
});

module.exports = router;
