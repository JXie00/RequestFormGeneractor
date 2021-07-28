const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(
  express.urlencoded({
    extended: true,
  })
);
const {
  retrivePetsGeneralData,
} = require("../controllers/fetchDataController");
const {
  createNewPetsRecord,
  updatePetsRecord,
} = require("../controllers/newRecordController");

router.get("/pets/:requestCode", retrivePetsGeneralData);

router.post("/pets/:requestCode", createNewPetsRecord);

router.put("/pets/:requestCode", updatePetsRecord);

module.exports = router;
