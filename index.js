const express = require("express");
const sql = require("mssql");
const app = express();
const dotenv = require("dotenv").config();

const indexRouter = require("./routes/index");
const postRouter = require("./routes/post");
const putRouter = require("./routes/put");

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

app.use("/", indexRouter);
app.use("/", postRouter);
app.use("/", putRouter);

module.exports = app;
