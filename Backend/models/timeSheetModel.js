const mongoose = require('mongoose');
const timesheetSchema = new mongoose.Schema({
    day: String,
    date: Date,
    project: String,
    regular: Number,
    overtime: Number, 
    clockIn1: String, 
    clockOut1: String, 
    clockIn2: String, 
    clockOut2: String, 
    clockIn3: String, 
    clockOut3: String
});

module.exports=mongoose.model('Timesheet', timesheetSchema)