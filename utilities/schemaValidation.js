const { Validator } = require("jsonschema");
const V = new Validator();
const isValid = (body) => {
  let schema = {
    type: "object",
    properties: {
      XCoord: {
        type: "string",
      },
      YCoord: {
        type: "string",
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

  return V.validate(body, schema).valid;
};
module.exports = { isValid };
