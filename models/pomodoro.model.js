const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PomodoroSchema = new Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  taskDesc: {
    type: Schema.Types.ObjectId,
    ref: 'Task', 
    required:true
  }
});

const Pomodoro = mongoose.model('Pomodoro', PomodoroSchema);

module.exports = Pomodoro;
