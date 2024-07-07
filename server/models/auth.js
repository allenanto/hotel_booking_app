const mongoose = require("mongoose");

const authSchema = mongoose.Schema({
  username: String,
  password: String,
});

module.exports = mongoose.model("auth", authSchema);
