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
  let startDate = new Date(req.params.startDate); // Convert startDate to Date object
  let endDate = new Date(req.params.endDate); // Convert endDate to Date object
  
  // Set time to 00:00:00 UTC for both startDate and endDate
  startDate.setUTCHours(0, 0, 0, 0);
  endDate.setUTCHours(0, 0, 0, 0);
  
  // Ensure endDate includes all entries of that day by setting it to the end of the day
  endDate.setUTCHours(23, 59, 59, 999);

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
  let index = 0;
  const dayDate = [];
  const updatedData = req.body;
  updatedData.array.forEach(element => {
    dayDate[index] = {day:updatedData.day, date:updatedData.date};
    index++;
  
  try{
    
    await Timesheet.updateOne(dayDate, {
      project: updatedData.project, 
      regular: updatedData.regular, 
      overtime: updatedData.overtime, 
      employeeID: updatedData.employeeID, 
      clockIn1: updatedData.clockIn1, 
      clockOut1: updatedData.clockOut1, 
      clockIn2: updatedData.clockIn2, 
      clockOut2: updatedData.clockOut2, 
      clockIn3: updatedData.clockIn3, 
      clockOut3: updatedData.clockOut3
    })
     res.status(200).json({TimeSheet:Timesheet.toObject({getters:true})});

  } catch (err){
    console.log(err);
    return next(new Error("Failed to update time sheet data."));
  }
});
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
