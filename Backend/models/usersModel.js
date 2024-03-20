const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  userName: String,
  password: String,
  role: String,
  employeeID: Number,
  firstName: Number,
  lastName: String,
});

module.exports = mongoose.model("Users", userSchema);
