const mongoose = require('mongoose');
const Timesheet = require("../models/timeSheet");

const createTimesheet = async (req, res, next) => {
    const timeData  = req.body;
    console.log(timeData)
    let newTimesheet;
    try {
        newTimesheet = new Timesheet(timeData);
        console.log(newTimesheet);
        await newTimesheet.save();
    }
    catch (err) {
        return next(err);
    }

    res.status(201).json({ Timesheet: newTimesheet.toObject({ getters: true }) });
};

exports.createTimesheet = createTimesheet;

const getTimeData = async (req, res, next) => {
    const tid = req.params.tid;

    console.log(tid);
    
    let timesheet;
    try {
        timesheet = await Timesheet.findById(tid);
    }
    catch (err) {
        return next(err);
    }

    if (!timesheet) {
        return res.status(404).json({ message: "No timesheet found for this ID" });
    }

    res.json({ timesheet: timesheet.toObject({ getters: true }) });
};

exports.getTimeData = getTimeData;
exports.createTimesheet = createTimesheet;
