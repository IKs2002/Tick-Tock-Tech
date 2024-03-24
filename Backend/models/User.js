const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  userName: String,
  password: String,
  role: String,
  employeeID: Number,
  firstName: String,
  lastName: String,
  status: String,
  accessLock: String
});

module.exports = mongoose.model("users", userSchema);
