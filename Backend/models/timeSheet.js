//THIS FILE IS THE SCHEMA FOR TIMESHEETS
const mongoose = require('mongoose');
const timesheetSchema = new mongoose.Schema({
    day: String,
    date: Date,
    project: String,
    employeeID: String,
    clockIn1: String, 
    clockOut1: String, 
    clockIn2: String, 
    clockOut2: String, 
    clockIn3: String, 
    clockOut3: String
});

module.exports = mongoose.model('timeSheets', timesheetSchema);