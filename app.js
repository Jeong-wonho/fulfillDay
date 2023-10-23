const path = require("path");

const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

dotenv.config();

const passportConfig = require("./passport");

const dbUri = process.env.DB_URI;

const app = express();

//bodyParser.json() => application/json
app.use(bodyParser.json());
passportConfig();
//cors error solved
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTION, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(passport.initialize());
//router add+
const taskRoutes = require("./routes/task.routes.js");
const pomodoroRoutes = require("./routes/pomodoro.routes.js");
const authRoutes = require("./routes/auth.routes.js");

// router settings
app.use("/task", taskRoutes);
app.use("/pomodoro", pomodoroRoutes);
app.use("/auth", authRoutes);

//mongoose Connection
mongoose
  .connect(dbUri)
  .then((result) => {
    app.listen(8080);
    console.log("port접속");
  })
  .catch((err) => console.log(err));

module.exports = app;
