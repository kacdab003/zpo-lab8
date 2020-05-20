const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const app = express();
const studentsRoutes = require("./routes/student");
const port = process.env.NODE_ENV === "test" ? 3001 : 3000;
const dbUrl =
  process.env.NODE_ENV === "test"
    ? process.env.MONGODB_URI_TEST
    : process.env.MONGODB_URI;
app.use(bodyParser.json());
app.use("/students", studentsRoutes);

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => server);
const server = app.listen(port, () => {
  console.log("App runs on port " + port);
});
module.exports = { app, server };
