const express = require("express");
const sql = require("mssql");
const router = express.Router();
const axios = require("axios");
const getRequestFuncs = require("../utilities/getRequestFunctions");

const checkReferenceCodeFormat = new RegExp(
  /^(US|AU)[0-9]{3,5}[-]\w{2}\d{3,5}$/
);
let isId = false;

router.get("/pdf/:requestCode", async (req, res) => {
  const requestCode = req.params.requestCode;
  checkReferenceCodeFormat.test(requestCode) ? (isId = true) : (isId = false);

  if (isId) {
    try {
      //petinfo
      const petInformation = await getRequestFuncs.retrivePetInfo(requestCode);

      const petInfo = petInformation.recordsets[0][0];
      const age = getRequestFuncs.ageCalulation(petInfo.PatDOB);

      const animalName = petInfo.PatFirstName;
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
        default:
          sex = "Male";
          break;
      }

      //ownerInfo

      const ownerInformation = await getRequestFuncs.retriveOwnerInfo(
        requestCode
      );
      const ownerInfo = ownerInformation.recordsets[0][0];
      const owner = ownerInfo.Owner;
      const species = ownerInfo.Species;
      const breed = ownerInfo.Breed;
      const desexed = ownerInfo.Desexed;

      console.log(owner, species, breed, desexed);

      //ClinicInfo
      const ClinicInformation = await getRequestFuncs.retriveClinicInfo(
        requestCode
      );
      const ClinicInfo = ClinicInformation.recordsets[0][0];
      const clinicDetails = ClinicInfo.Address1;
      const address = `${ClinicInfo.Address2} ,${ClinicInfo.Suburb} ,${ClinicInfo.State} ${ClinicInfo.Postcode}`;

      const surname = ClinicInfo.Surname;
      const firstName = ClinicInfo.FirstName;

      const data = {
        Age: age,
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
  } else {
    res.status(404).send("page could not be found");
  }
});

module.exports = router;
