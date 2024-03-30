const mongoose = require('mongoose');

const inactiveUserSchema = new mongoose.Schema({
    name:{type: String, required: true},
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password:{type: String, required: true,},
    // role: String,
    // employeeID: Number,
    status:{type: String, default:'',},
    accessLock:{type: String, default:'Unlocked'}
});

const InactiveUser = mongoose.model('InactiveUser', inactiveUserSchema);

module.exports = InactiveUser;