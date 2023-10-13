const path = require("path");

const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

dotenv.config();

const dbUri = process.env.DB_URI;
const port = process.env.PORT;

const app = express();

//bodyParser.json() => application/json
app.use(bodyParser.json());

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

//router add+
const taskRoutes = require("./routes/task.routes.js");
const pomodoroRoutes = require("./routes/pomodoro.routes.js");

// router settings
app.use("/task", taskRoutes);
app.use("/pomodoro", pomodoroRoutes);

//mongoose Connection
mongoose
  .connect(dbUri)
  .then((result) => {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
