const mongoose = require('mongoose');
const Timesheet = require("../models/TimesheetModel");


const getTimeData = async (req, res, next) => {
    const tid = new mongoose.Types.ObjectId(req.params.tid);
    const idExists = await Timesheet.exists({ _id: tid });
    if (!idExists) {
        console.log(`No timesheet found for ID ${tid}`);
    }
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
