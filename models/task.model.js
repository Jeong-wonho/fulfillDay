const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * taskSchema in mongoose
 * task:
 * totalTime:
 * tag:
 * completed:
 */
const taskSchema = new Schema({
    task: {type: String, default: true},
    // description add+ 
    totalTime: {type: Date, default: false},
    tag:{type: String, default: false},
    completed:{type: String, default: false}
}, {
    timestamps: true,
});



module.exports = mongoose.model('Task', taskSchema);