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

const updateTimeData = async (req, res, next) => { //Editing Timesheet 
    const timesheetId = req.params.tid;
    const updatedData = req.body;

    let existingTimesheet;
    try {
        existingTimesheet = await Timesheet.findById(timesheetId);
    } catch (err) {
        res.status(404).json({ message:"Failed to find the timesheet for updating."});
    }

    if (!existingTimesheet) {
        res.status(404).json({ message:"No timesheet found with the provided ID."});
    }

    // Update fields
    for (let key in updatedData) {
        existingTimesheet[key] = updatedData[key];
    }

    try {
        await existingTimesheet.save();
    } catch (err) {
        return next(new Error("Failed to update the timesheet."));
    }

    res.status(200).json({ timesheet: existingTimesheet.toObject({ getters: true }) });
};

// const deleteTimeData = async (req, res, next) => {
//     const timesheetId = req.params.tid;

//     try {
//         const deletedTimesheet = await Timesheet.findByIdAndDelete(timesheetId);

//         if (!deletedTimesheet) {
//             res.status(404).json({ message:"No timesheet found with the provided ID."});
//         }

//         res.status(200).json({ message: "Timesheet deleted successfully." });
//     } catch (err) {
//         console.error(err);
//         return next(new Error("Failed to delete the timesheet."));
//     }
// };

exports.getTimeData = getTimeData;
exports.createTimesheet = createTimesheet;
exports.updateTimeData = updateTimeData;
// exports.deleteTimeData = deleteTimeData;