const Task = require("../models/task.model.js");

/**
 * All Todo-list get
 */
exports.getTasks = (req, res, next) => {
  console.log("tasks");
  Task.find()
    .then((task) => console.log("inner task"))
    .then((task) => {
      res.send("<h1>hello world</h1>");
    })
    .catch((err) => console.log(err));
};
