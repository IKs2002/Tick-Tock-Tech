
const mongoose = require('mongoose');
const InactiveUserTimesheetsSchema = new mongoose.Schema({
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

const InactiveUserTimesheets = mongoose.model('InactiveUserTimeSheets', InactiveUserTimesheetsSchema);

module.exports = InactiveUserTimesheets;