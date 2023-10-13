const dayjs = require('dayjs');
require('dayjs/locale/ko');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

const Pomodoro = require("../models/pomodoro.model");

//dayjs plugins add+
dayjs.extend(utc);
dayjs.extend(timezone);

// Pomodoro 타이머 생성
exports.createPomodoro = async (req, res) => {
  try {
    const { userId, startTime, endTime, taskName } = req.body;
    
    const thirtyMinutesLater = dayjs(startTime).add(30, 'minutes');
    const adjustedEndDate = dayjs(endTime).isAfter(thirtyMinutesLater)
      ? thirtyMinutesLater.toDate()
      : endTime;
    
    // 새로운 Pomdoror 객체 생성
    const pomodoro = new Pomodoro({
        // userId,
      startTime: startTime,
      endTime: adjustedEndDate,
      taskName: taskName,
    });

    // DB에 저장
    await pomodoro.save();

    res.status(201).json({ success: true, data: pomodoro });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: "Pomodoro 타이머 생성에 실패했습니다." });
  }
};

// 모든 Pomodoro 타이머 조회
exports.getAllPomodoros = async (req, res) => {
  try {
    const pomodoros = await Pomodoro.find();
    res.status(200).json({ success: true, data: pomodoros });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: "Pomodoro 타이머 조회에 실패했습니다." });
  }
};
// 특정 Pomodoro 타이머 삭제
exports.deletePomodoro = async (req, res) => {
    try {
      const { id } = req.params;
  
      // 해당 ID의 Pomdoror 객체 삭제
      await Pomodoror.findByIdAndRemove(id);
  
      res.status(200).json({ success: true, message: 'Pomdoror 타이머가 성공적으로 삭제되었습니다.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Pomdoror 타이머 삭제에 실패했습니다.' });
    }
  };