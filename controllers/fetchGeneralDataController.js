import ageCalculation from "../utilities/ageCalculation.js";
import DBdata from "../database/retriveData.js";
import checkReferenceCodeFormat from "../constants/regex.js";
import getSexFromAbbreviation from "../utilities/getSexFromAbbreviation.js";

const retrivePetsGeneralData = async (req, res) => {
  const { requestCode } = req.params;
  let isRequestCode = checkReferenceCodeFormat.test(requestCode);

  try {
    if (!isRequestCode) {
      return res.status(404).send("page could not be found");
    }
    //petInfo
    const petInformation = await DBdata.retrivePetInfo(requestCode);
    // if (petInformation === undefined) return;
    const petInfo = petInformation.recordsets[0][0];
    const age = ageCalculation(petInfo.PatDOB);
    const animalName = petInfo.PatFirstName;
    let sex = getSexFromAbbreviation(petInfo.PatSex);
    //ownerInfo

    const ownerInformation = await DBdata.retriveOwnerInfo(requestCode);
    // if (ownerInformation === undefined) return;
    const ownerInfo = ownerInformation.recordsets[0][0];
    const { Owner, Species, Breed, Desexed } = ownerInfo;

    //ClinicInfo
    const ClinicInformation = await DBdata.retriveClinicInfo(requestCode);
    // if (ClinicInformation === undefined) return;
    const ClinicInfo = ClinicInformation.recordsets[0][0];
    const address = `${ClinicInfo.Address2} ,${ClinicInfo.Suburb} ,${ClinicInfo.State} ${ClinicInfo.Postcode}`;
    const { Address1, Surname, FirstName } = ClinicInfo;

    const data = {
      Age: age,
      AnimalName: animalName,
      Sex: sex,
      Owner: Owner,
      Species: Species,
      Breed: Breed,
      Desexed: Desexed,
      ClinicDetails: Address1,
      ClinicAddress: address,
      VetSurname: Surname,
      VetFirstName: FirstName,
    };

    res.json(data);
  } catch (err) {
    res.status(400).send(err);
  }
};
export default retrivePetsGeneralData;
