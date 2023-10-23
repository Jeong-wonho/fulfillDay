const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    nick: { type: String, required: true },
    password: { type: String, required: false },
    // snsId: { type: String, required: true },
    provider: { type: String, required: true },
  },
  { timestamp: true }
);

module.exports = mongoose.model("User", UserSchema);
