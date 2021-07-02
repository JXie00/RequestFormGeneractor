const DBdata = require("../database/retriveData");
const checkReferenceCodeFormat = require("../constants/regex");

createNewRecord = async (req, res) => {
  let isRequestCode;
  const requestCode = req.params.requestCode;
  checkReferenceCodeFormat.regex.test(requestCode)
    ? (isRequestCode = true)
    : (isRequestCode = false);

  try {
    if (isRequestCode) {
      const checkPdfStatus = await DBdata.checkPdfStatus(requestCode);
      let ID = checkPdfStatus.recordsets[0][0];
      if (ID == undefined) {
        await DBdata.insertRequestCode(requestCode);
        res.json({
          confirmation: "succed",
        });
      } else {
        res.status(400).send("this file has already been modified");
      }
    } else {
      res.status(404).send("page could not be found");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = createNewRecord;
