import axios from "axios";
const fetchInitialData = async (requestCode) => {
  return await axios.get(
    `http://localhost:${process.env.port}/pets/${requestCode}`
  );
};
export default fetchInitialData;
