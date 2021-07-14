const express = require("express");
const app = express();
const connectDB = require("./database/connection");

const routes = require("./routes/routes");

connectDB();

app.listen(process.env.port, () =>
  console.log(`Listening at ${process.env.port}`)
);

app.use(express.json({ limit: "2mb" }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/", routes);

module.exports = app;
