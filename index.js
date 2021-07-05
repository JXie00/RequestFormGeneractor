const express = require("express");
const app = express();
const connectDB = require("./database/connection");

const routes = require("./routes/routes");

connectDB();

app.listen(3000, () => console.log("listening at 3000"));
app.use(express.static("public"));
app.use(express.json({ limit: "2mb" }));

app.use("/", routes);

module.exports = app;
