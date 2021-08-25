import { Validator } from "jsonschema";
const V = new Validator();
const isValid = (body) => {
  let schema = {
    type: "object",
    properties: {
      xCoord: {
        type: "string",
      },
      yCoord: {
        type: "string",
      },
      radius: {
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
export default { isValid };
