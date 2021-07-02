const getRequestFuncs = require("../utilities/ageCalculation");
const DBdata = require("../database/retriveData");
const checkReferenceCodeFormat = require("../constants/regex");

getRequest = async (req, res) => {
  let isRequestCode;
  const requestCode = req.params.requestCode;
  checkReferenceCodeFormat.regex.test(requestCode)
    ? (isRequestCode = true)
    : (isRequestCode = false);

  if (isRequestCode) {
    try {
      //petinfo
      const petInformation = await DBdata.retrivePetInfo(requestCode);

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

      const ownerInformation = await DBdata.retriveOwnerInfo(requestCode);
      const ownerInfo = ownerInformation.recordsets[0][0];
      const owner = ownerInfo.Owner;
      const species = ownerInfo.Species;
      const breed = ownerInfo.Breed;
      const desexed = ownerInfo.Desexed;

      console.log(owner, species, breed, desexed);

      //ClinicInfo
      const ClinicInformation = await DBdata.retriveClinicInfo(requestCode);
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
};

module.exports = getRequest;
