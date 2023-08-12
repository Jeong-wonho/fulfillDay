//npm modules
const express = require('express');
//controller
const taskController = require('../controller/task.controller.js')

const router = express.Router();

router.get('/', taskController.getTasks);

module.exports = router;