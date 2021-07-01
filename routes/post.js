const express = require("express");
const sql = require("mssql");
const router = express.Router();
const postRequestFuncs = require("../utilities/postRequestFunctions");

const checkReferenceCodeFormat = new RegExp(
  /^(US|AU)[0-9]{3,5}[-]\w{2}\d{3,5}$/
);
let isId = false;

//Post Request
router.post("/connect/:requestCode", async (req, res) => {
  const requestCode = req.params.requestCode;
  checkReferenceCodeFormat.test(requestCode) ? (isId = true) : (isId = false);

  try {
    if (isId) {
      const checkPdfStatus = await postRequestFuncs.checkPdfStatus(requestCode);
      let ID = checkPdfStatus.recordsets[0][0];
      if (ID == undefined) {
        await postRequestFuncs.insertRequestCode(requestCode);
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
});

module.exports = router;
