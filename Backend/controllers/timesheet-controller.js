const Timesheet = require("../models/TimesheetModel");


const getTimeData = async (req, res, next) => {
    const employeeId = req.params.employee_id;
    console.log(employeeId);
    let timesheet
    try {
    timesheet = await Timesheet.findById(employeeId) 
    }
    catch (err) {
        return next(err);
    }

    if (!timesheet) {
        return res.status(404).json({ message: "No timesheet found for this employee ID" });
    }

    res.json({ timesheet: timesheet.toObject( {getters: true}) });
};

  exports.getTimeData = getTimeData;