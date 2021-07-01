const Validator = require("jsonschema").Validator;
const V = new Validator();

isValid = (body) => {
  let schema = {
    type: "object",
    properties: {
      XCoord: {
        type: "number",
      },
      YCoord: {
        type: "number",
      },
      Radious: {
        type: "number",
      },
      clinicalHistory: {
        type: "string",
      },
      desciption: {
        type: "string",
      },
      cytologyFindings: {
        type: "string",
      },
      differentialDiag: {
        type: "string",
      },
    },
  };
  const validData = V.validate(body, schema);

  if (validData.valid) {
    return true;
  }
  return false;
};

retriveDBInfo = async (requestCode) => {
  const retriveDBInfo = await sql.query(
    `SELECT * FROM dbo.sampleIndicator WHERE RequestCode = '${requestCode}'`
  );
  return retriveDBInfo;
};

module.exports = { isValid, retriveDBInfo };
