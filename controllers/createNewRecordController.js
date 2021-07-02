const DBdata = require("../database/retriveData");
const checkReferenceCodeFormat = require("../constants/regex");

createNewRecord = async (req, res) => {
  const requestCode = req.params.requestCode;
  let isRequestCode = checkReferenceCodeFormat.regex.test(requestCode);

  try {
    if (!isRequestCode) {
      return res.status(404).send("page could not be found");
    }
    const checkPdfStatus = await DBdata.checkPdfStatus(requestCode);
    let ID = checkPdfStatus.recordsets[0][0];

    if (ID != undefined) {
      return res.status(400).send("this file has already been modified");
    }
    await DBdata.insertRequestCode(requestCode);
    res.json({
      confirmation: "succed",
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = createNewRecord;
