const { grayscale, rgb } = require("pdf-lib");
const onPDFLcationCalculation = async (xCoord, yCoord, radious, page) => {
  if (xCoord === "") return;

  xCoord = xCoord.split(",");
  yCoord = yCoord.split(",");

  xCoord = xCoord.map((value) => {
    return (295 + parseInt(value) / 1.68).toFixed(2);
  });

  yCoord = yCoord.map((value) => {
    return (650 - parseInt(value) / 1.73).toFixed(2);
  });

  console.log(xCoord, yCoord);

  for (let i = 0; i < xCoord.length; i++) {
    console.log(i);
    page.drawCircle({
      x: parseInt(xCoord[i]),
      y: parseInt(yCoord[i]),
      size: radious,
      borderColor: grayscale(0.5),
      color: rgb(1, 0, 0),
      opacity: 0.5,
      borderOpacity: 0.75,
    });
  }
};
module.exports = onPDFLcationCalculation;
