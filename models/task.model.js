const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * taskSchema in mongoose
 * task:
 * totalTime:
 * tag:
 * completed:
 */
const taskSchema = new Schema(
  {
    
    taskDesc: { type: String, default: true },
    // description add+
    //totalTime pomodoroTimer 구현 후 구현 예정
    // totalTime: {type: Date, default: false},
    tag: { type: String, default: false },
    completed: { type: String, default: false },
    //  userSchema 추가후 해제.
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User', 
      required:true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
