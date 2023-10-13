const express = require('express');

// validator add +

const router = express.Router();

//GET pomodoro timer controller 추가 필요
const pomodoroController = require('../controllers/pomodoro.controller');

//router Get
router.get('/', pomodoroController.getAllPomodoros);

//router post 
router.post('/', pomodoroController.createPomodoro);

//삭제기능 필요한지는 모르겠음
// 특정 Pomodoro 타이머 삭제
router.delete('/:id', pomodoroController.deletePomodoro);

module.exports = router;
