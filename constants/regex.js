const checkReferenceCodeFormat = new RegExp(
  /^(US|AU)[0-9]{3,5}[-]\w{2}\d{3,5}$/
);
export default checkReferenceCodeFormat;
