const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(
  express.urlencoded({
    extended: true,
  })
);
const retriveGeneralData = require("../controllers/fetchDataController");
const {
  createNewRecord,
  updateTable,
} = require("../controllers/newRecordController");

router.get("/:requestCode", retriveGeneralData);

router.post("/connect/:requestCode", createNewRecord);

router.put("/update/:requestCode", updateTable);

module.exports = router;
