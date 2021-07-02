const ageCalculation = require("../utilities/ageCalculation");
const DBdata = require("../database/retriveData");
const checkReferenceCodeFormat = require("../constants/regex");
const getSexFromAbbreviation = require("../utilities/getSexFromAbbreviation");

getRequest = async (req, res) => {
  const requestCode = req.params.requestCode;
  let isRequestCode = checkReferenceCodeFormat.regex.test(requestCode);

  try {
    if (!isRequestCode) {
      return res.status(404).send("page could not be found");
    }
    const petInformation = await DBdata.retrivePetInfo(requestCode);
    const petInfo = petInformation.recordsets[0][0];
    const age = ageCalculation(petInfo.PatDOB);
    const animalName = petInfo.PatFirstName;
    let sex = getSexFromAbbreviation(petInfo.PatSex);
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
      ClinicAddress: address,
      VetSurname: surname,
      VetFirstName: firstName,
    };
    res.json(data);
  } catch (err) {
    res.send(err);
  }
};

module.exports = getRequest;
