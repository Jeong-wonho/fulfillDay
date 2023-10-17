const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {type: String, required: true},
    nick: {type: String, required: true},
    password: {type:String, required: true},
    registration_type: {type:String, required:true},
    social_user_id: {type: String, required: false},
  },
  { timestamp: true }
);

module.exports = mongoose.model("User", UserSchema);
