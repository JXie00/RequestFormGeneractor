import DBdata from "../database/retriveData.js";
import checkReferenceCodeFormat from "../constants/regex.js";

export const fillInStoredData = async (req, res) => {
  const { requestCode } = req.params;

  if (!checkReferenceCodeFormat.test(requestCode)) {
    return res.status(404).send("page could not be found");
  }
  try {
    const checkPDFStatus = await DBdata.checkPDFStatus(requestCode);
    let ID = checkPDFStatus.recordsets[0][0];
    if (ID === undefined) return res.json("");

    const retriveDBData = await DBdata.retriveCurrentPDFData(requestCode);
    const storedData = retriveDBData.recordsets[0][0];
    res.status(200).json(storedData);
  } catch (err) {
    res.status(404).send(err);
  }
};
