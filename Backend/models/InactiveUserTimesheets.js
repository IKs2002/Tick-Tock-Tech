//THIS FILE IS THE SCHEMA FOR AN INACTIVE USER'S TIME SHEETS. ALL OF THE TIMESHEETS OF A DELETED USER WILL BE CONVERTED INTO THIS FORMAT, THEN PLACED INTO THIS COLLECTION
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