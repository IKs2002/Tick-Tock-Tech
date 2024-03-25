const mongoose = require("mongoose");
const Timesheet = require("../models/timeSheet");

const createTimesheet = async (req, res, next) => {
  const timeData = req.body;
  console.log(timeData);
  let newTimesheet;
  try {
    newTimesheet = new Timesheet(timeData);
    console.log(newTimesheet);
    await newTimesheet.save();
  } catch (err) {
    return next(err);
  }

  res.status(201).json({ Timesheet: newTimesheet.toObject({ getters: true }) });
};

const getTimeData = async (req, res, next) => {
    const uid = req.params.uid.split('=')[1];
  const startDate = req.params.startDate;
  const endDate = req.params.endDate;
  //Assuming these are passed as query parameters

  //Convert startDate and endDate to Date objects to ensure proper querying
  //const start = new Date(startDate);
  //const end = new Date(endDate);
  //end.setHours(23, 59, 59, 999); // Adjust to the end of the endDate to include all entries of that day

  let timesheets;
  try {
    timesheets = await Timesheet.find({
      employeeID: uid, // Match the timesheet to the given userID
      date: {
        $gte: startDate, // Greater than or equal to startDate
        $lte: endDate, // Less than or equal to endDate
      },
    });
  } catch (err) {
    return next(err);
  }

  if (!timesheets || timesheets.length === 0) {
    return res
      .status(404)
      .json({
        message:
          "No timesheets found for this user within the specified date range.",
      });
  }

  // Preparing data for table population
  res
    .status(200)
    .json({
      timesheets: timesheets.map((timesheet) =>
        timesheet.toObject({ getters: true })
      ),
    });
};

const updateTimeData = async (req, res, next) => {
  //Editing Timesheet
  //const uid = req.params.uid;
  const timesheetId = req.params.tid;
  const updatedData = req.body;

  let existingTimesheet;
  try {
    existingTimesheet = await Timesheet.findById(timesheetId);
  } catch (err) {
    res
      .status(404)
      .json({ message: "Failed to find the timesheet for updating." });
  }

  if (!existingTimesheet) {
    res
      .status(404)
      .json({ message: "No timesheet found with the provided ID." });
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

  res
    .status(200)
    .json({ timesheet: existingTimesheet.toObject({ getters: true }) });
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
