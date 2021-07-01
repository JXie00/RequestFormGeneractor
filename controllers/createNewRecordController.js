const DBdata = require("../database/retriveData");
const checkReferenceCodeFormat = require("../constants/regex");

createNewRecord = async (req, res) => {
  let isId = false;
  const requestCode = req.params.requestCode;
  checkReferenceCodeFormat.regex.test(requestCode)
    ? (isId = true)
    : (isId = false);

  try {
    if (isId) {
      const checkPdfStatus = await DBdata.checkPdfStatus(requestCode);
      let ID = checkPdfStatus.recordsets[0][0];
      if (ID == undefined) {
        await DBdata.insertRequestCode(requestCode);
      } else {
        console.log("this file has already been modified");
      }
      res.json({
        confirmation: "success",
      });
    } else {
      res.status(404).send("page could not be found");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = createNewRecord;
