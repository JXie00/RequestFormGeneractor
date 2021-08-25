import ageCalculation from "../utilities/ageCalculation.js";
import DBdata from "../database/retriveData.js";
import checkReferenceCodeFormat from "../constants/regex.js";
import getSexFromAbbreviation from "../utilities/getSexFromAbbreviation.js";

const retrivePetsGeneralData = async (req, res) => {
  const { requestCode } = req.params;

  if (!checkReferenceCodeFormat.test(requestCode)) {
    return res.status(404).send("page could not be found");
  }
  try {
    //petInfo
    const petInformation = await DBdata.retrivePetInfo(requestCode);
    const petInfo = petInformation.recordsets[0][0];
    if (petInfo === undefined)
      return res.status(404).send("page could not found");
    const age = ageCalculation(petInfo.PatDOB);
    const animalName = petInfo.PatFirstName;
    let sex = getSexFromAbbreviation(petInfo.PatSex);
    //ownerInfo

    const ownerInformation = await DBdata.retriveOwnerInfo(requestCode);
    const ownerInfo = ownerInformation.recordsets[0][0];
    const { Owner, Species, Breed, Desexed } = ownerInfo;

    //ClinicInfo
    const clinicInformation = await DBdata.retriveClinicInfo(requestCode);
    const clinicInfo = clinicInformation.recordsets[0][0];
    const address = `${clinicInfo.Address2}, ${clinicInfo.Suburb}, ${clinicInfo.State} ${clinicInfo.Postcode}`;
    const { Address1, Surname, FirstName } = clinicInfo;

    const data = {
      Age: age,
      AnimalName: animalName,
      Gender: sex,
      OwnerName: Owner,
      Species: Species,
      Breed: Breed,
      Desexed: Desexed,
      ClinicName: Address1,
      Address1: address,
      Surname: Surname,
      FirstName: FirstName,
    };

    res.json(data);
  } catch (err) {
    res.status(404).send(err);
  }
};
export default retrivePetsGeneralData;
