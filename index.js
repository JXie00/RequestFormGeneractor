const express = require("express");
const sql = require("mssql");
const app = express();
const dotenv = require("dotenv").config();

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

(async () => {
  try {
    await sql.connect(config);
    console.log("connecting succefully");
  } catch (err) {
    console.log(err);
  }
})();

app.listen(3000, () => console.log("listening at 3000"));
app.use(express.static("public"));
app.use(express.json({ limit: "2mb" }));

const indexRouter = require("./routes/index");

app.use("/", indexRouter);

module.exports = app;
