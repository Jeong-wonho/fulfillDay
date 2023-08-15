//npm modules
const express = require('express');
//controller
const taskController = require('../controller/task.controller.js')

const router = express.Router();

router.get('/', taskController.getTasks);

router.post('/add-task', taskController.postTasks);
router.post('/delete-task', taskController.deleteTask);
router.post('/update-task', taskController.updateTask);

module.exports = router;