//THIS FILE IS THE SCHEMA FOR A USER WHO WAS DELETED FROM THE ADMIN GUI
const mongoose = require("mongoose");
const inactiveUserSchema = new mongoose.Schema({
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

const InactiveUser = mongoose.model('InactiveUser', inactiveUserSchema);

module.exports = InactiveUser;