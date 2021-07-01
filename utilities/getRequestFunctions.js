const sql = require("mssql");

ageCalulation = (PatDOB) => {
  let age = new Date();
  const days = Math.floor((((age - PatDOB) / 1000 / 3600 / 24) % 365) % 30);
  const months = Math.floor((((age - PatDOB) / 1000 / 3600 / 24) % 365) / 30);
  const years = Math.floor((age - PatDOB) / 1000 / 3600 / 24 / 365);
  return `${years} y ${months} m ${days} d`;
};

retrivePetInfo = async (requestCode) => {
  const petInformation = await sql.query(
    `SELECT PatFirstName, PatDOB, PatSex From DBO.PathologyOrdering where RequestCode ='${requestCode}' `
  );
  return petInformation;
};

retriveClinicInfo = async (requestCode) => {
  const ClinicInformation = await sql.query(
    `SELECT Surname,[First Name] as FirstName,[Address Line 1] as Address1, [Address Line 2] as Address2, Suburb, State, Postcode From DBO.Addresses as A, DBO.pathologyOrdering as P where A.ID = P.P2kAddressId and P.RequestCode = '${requestCode}'`
  );
  return ClinicInformation;
};

retriveOwnerInfo = async (requestCode) => {
  let ownerInformation = await sql.query(
    `SELECT Owner, Species, Breed, Desexed FROM DBO.Patients,DBO.PathologyOrdering where Patient# = P2kPatientID and  RequestCode = '${requestCode}'`
  );
  return ownerInformation;
};

module.exports = {
  ageCalulation,
  retrivePetInfo,
  retriveClinicInfo,
  retriveOwnerInfo,
};
