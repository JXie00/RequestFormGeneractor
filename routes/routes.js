const express = require("express");
const router = express.Router();
const retriveGeneralData = require("../controllers/fetchDataController");
const createNewRecord = require("../controllers/createNewRecordController");
const updateTable = require("../controllers/updateTableController");

router.get("/:requestCode", async (req, res) => {
  await retriveGeneralData(req, res);
});

router.post("/connect/:requestCode", async (req, res) => {
  await createNewRecord(req, res);
});

router.put("/update/:requestCode", async (req, res) => {
  await updateTable(req, res);
});

module.exports = router;
