//THIS FILE IS THE SCHEMA FOR USERS
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name:{type: String, required: true},
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password:{type: String, required: true,},
  role: {type: String},
  status:{type: String, default:'',},
  accessLock:{type: Boolean, default: false},
  
});

module.exports = mongoose.model("users", userSchema);
