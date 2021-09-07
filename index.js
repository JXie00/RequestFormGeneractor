import express from "express";
const app = express();
import connectDB from "./database/connection.js";

import routes from "./routes/routes.js";

connectDB();

app.listen(process.env.port, () =>
  console.log(`Listening at ${process.env.port}`)
);

app.use(express.json({ limit: "2mb" }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header({
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Allow-Methods": "POST, PUT, GET, OPTIONS",
  });
  next();
});

app.use("/", routes);

export default app;
