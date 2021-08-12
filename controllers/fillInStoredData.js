import DBdata from "../database/retriveData.js";
import checkReferenceCodeFormat from "../constants/regex.js";

export const fillInStoredData = async (req, res) => {
  const { requestCode } = req.params;
  let isRequestCode = checkReferenceCodeFormat.test(requestCode);

  try {
    if (!isRequestCode) {
      return res.status(400).send("page could not be found");
    }

    const checkPdfStatus = await DBdata.checkPdfStatus(requestCode);
    let ID = checkPdfStatus.recordsets[0][0];
    if (ID === undefined) return res.json("");

    const retriveDBData = await DBdata.retriveCurrentPDFData(requestCode);
    const storedData = retriveDBData.recordsets[0][0];
    res.json(storedData);
  } catch (err) {
    res.status(400).send(err);
  }
};
