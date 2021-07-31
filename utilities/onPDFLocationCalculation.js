import { grayscale, rgb } from "pdf-lib";
const onPDFLcationCalculation = async (xCoord, yCoord, radious, page) => {
  if (xCoord === "") return;

  xCoord = xCoord.split(",");
  yCoord = yCoord.split(",");
  const pdfXCoordStartPostion = 295;
  const pdfYCoordStartPostion = 650;
  const pdfXCoordRatio = 1.68;
  const pdfYCoordRatio = 1.73;

  xCoord = xCoord.map((value) => {
    return (pdfXCoordStartPostion + parseInt(value) / pdfXCoordRatio).toFixed(
      2
    );
  });

  yCoord = yCoord.map((value) => {
    return (pdfYCoordStartPostion - parseInt(value) / pdfYCoordRatio).toFixed(
      2
    );
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
export default onPDFLcationCalculation;
