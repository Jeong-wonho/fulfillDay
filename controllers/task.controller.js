const Task = require("../models/task.model.js");

/**
 * All Todo-list get
 */
exports.getTasks = async (req, res, next) => {
  try {
    const todos = await Task.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "Fetched task succesfully",
      todo: todos,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 *  Todo-list post
 */
exports.postTasks = async (req, res, next) => {
  // const task = req.body.taskDesc;
  // const tag = req.body.tag;
  // //진행사항으로 변경이 필요하다.
  // const completed = req.body.completed;
  const {task , tag, completed}= req.body;
  const todo = new Task({
    taskDesc: task,
    tag: tag,
    completed: completed
  });
  try {
    await todo.save();
    res.status(201).json({
      message: "Post created succesfully!",
      todo: todo,
    })
  }catch (err) {
    console.log(err);
  }
};

/**
 * Todo-list update
 */
exports.updateTask = async (req, res, next) => {
  // const taskId = req.body.taskId;
  // const taskDesc = req.body.taskDesc;
  // const tag = req.body.tag;
  // const completed = req.body.completed;
  const {taskId, taskDesc, tag, completed} = req.body

  try {
    const task = await Task.findById(taskId)
    if(!task) {
      const error = new Error('Could not find post.');
      error.statusCode = 404;
      throw error;
    }
    task.taskDesc = taskDesc;
    task.tag = tag;
    task.completed = completed;
    const result = await task.save();
    res.status(200).json({message: "Post updated", post: result});

  } catch (err) {
    console.log(err);
  }
  
};

/**
 * Todo-list delete
 */
exports.deleteTask = async (req, res, next) => {
  const {taskId} = req.body;

  try {
    const task = await Task.findById(taskId);

    if(!task) {
      const error = new Error('Could not find post');
      error.statusCode = 404;
      throw error;
    }

    await Task.findByIdAndRemove(taskId);

    res.status(200).json({message: 'Deleted post.'})
  } catch (err) {
    console.log(err);
  }
};