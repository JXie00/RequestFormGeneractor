const sql = require("mssql");

checkPdfStatus = async (requestCode) => {
  const checkPdfstatus = await sql.query(
    `SELECT ID FROM dbo.sampleindicator where requestCode ='${requestCode}' `
  );
  return checkPdfstatus;
};

insertRequestCode = async (requestCode) => {
  const insertRequestCode = await sql.query(
    `INSERT INTO dbo.Sampleindicator(Requestcode) VALUES ('${requestCode}')`
  );
  return insertRequestCode;
};

module.exports = { checkPdfStatus, insertRequestCode };
