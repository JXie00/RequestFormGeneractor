import sql from "mssql";
import dotenv from "dotenv";
dotenv.config();

const config = {
  user: process.env.user,
  password: process.env.password,
  server: process.env.server,
  database: process.env.database,
  options: {
    cryptoCredentialsDetails: {
      minVersion: "TLSv1",
    },
    trustServerCertificate: true,
  },
};

const connectDB = async () => {
  try {
    await sql.connect(config);
    console.log("connecting succefully");
  } catch (err) {
    console.log(err);
  }
};
export default connectDB;
