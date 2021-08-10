import express from "express";
import retrivePetsGeneralData from "../controllers/fetchDataController.js";
import {
  createNewPetsRecord,
  updatePetsRecord,
} from "../controllers/newRecordController.js";
const router = express.Router();
router.use(express.json());
router.use(
  express.urlencoded({
    extended: true,
  })
);

router.get("/pets/:requestCode", retrivePetsGeneralData);

router.post("/pets/:requestCode", createNewPetsRecord);

router.put("/pets/:requestCode", updatePetsRecord);

export default router;
