const Task = require("../models/task.model.js");

/**
 * All Todo-list get
 */
exports.getTasks = (req, res, next) => {
  Task.find()
    .then((tasks) => {
      res.render("edit-task", {
        tasks: tasks,
        pageTitle: "Tasks",
        path: "/"
      });
    })
    .catch((err) => console.log(err));
};
