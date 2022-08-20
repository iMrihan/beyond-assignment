const express = require("express");
const app = express();

const userRoute = require("./api/routes/user");

// const mongoose = require("mongoose");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/user", userRoute);
app.use((req, res, next) => {
  res.status(404).json({
    message: "bad request",
  });
});

module.exports = app;
