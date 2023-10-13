//npm modules
const express = require('express');
//controller
const taskController = require('../controller/task.controller.js')

const router = express.Router();

router.get('/', taskController.getTasks);
router.post('/add-task', taskController.postTasks);
router.put('/update-task', taskController.updateTask);
router.delete('/delete-task', taskController.deleteTask);

module.exports = router;