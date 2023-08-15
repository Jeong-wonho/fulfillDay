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

/** 
 *  Todo-list post
 */
exports.postTasks = (req, res, next) => {
  const title = req.body.task;
  const tag = req.body.tag;
  //진행사항으로 변경이 필요하다.
  const completed = req.body.completed;
  const task = new Task({
    taskDesc: title,
    tag: tag,
    completed: completed
  });
  task.save().then((result) => {
    console.log('Created task');
    res.redirect('/')
  }).catch(err => console.log(err));
}

/** 
 * Todo-list delete
 */
exports.deleteTask = (req, res, next) => {
  const taskId = req.body.taskId;
  console.log(taskId);
  Task.findByIdAndRemove(taskId).then(() => {
    console.log('Destroyed task');
    res.redirect('/');
  }).catch(err=>console.log(err));
}

/**
 * Todo-list update
 */
exports.updateTask = (req, res, next) => {
  
  const taskId = req.body.taskId;
  const taskDesc = req.body.taskDesc;

  console.log(taskId, taskDesc);

  Task.findById(taskId).then((task) => {
    task.taskDesc = taskDesc;
    return task.save();
  }).then(result => {
    console.log(result);
    console.log("updated task!");
    res.redirect('/');
  }).catch(err => console.log(err))

}