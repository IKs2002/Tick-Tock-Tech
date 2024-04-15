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
  const timeSheetId = req.params.tid;
  const updatedData = req.body;

  try{
    const timeSheet = await Timesheet.findOne({_id:ObjectID(timeSheetId)})
    if(!timeSheet){
      return res.status(404).json({message: "Time sheet not found."});
    }

    timeSheet = updatedData.project || timeSheet.project;
    timeSheet.project = updatedData.project || timeSheet.project;
    timeSheet.employeeID = updatedData.employeeID || timeSheet.employeeID;
    timeSheet.clockIn1 = updatedData.clockIn1 || timeSheet.clockIn1;
    timeSheet.clockOut1 = updatedData.clockOut1 || timeSheet.clockOut1;
    timeSheet.clockIn2 = updatedData.clockIn2 || timeSheet.clockIn2;
    timeSheet.clockOut2 = updatedData.clockOut2 || timeSheet.clockOut2;
    timeSheet.clockIn3 = updatedData.clockIn3 || timeSheet.clockIn3;
    timeSheet.clockOut3 = updatedData.clockOut3 || timeSheet.clockOut3;
    await timeSheet.save();

    await Timesheet.updateOne({_id:ObjectID(timesheetID)}, {
      project: timeSheet.project, 
      employeeID: timeSheet.employeeID, 
      clockIn1: timeSheet.clockIn1, 
      clockOut1: timeSheet.clockOut1, 
      clockIn2: timeSheet.clockIn2, 
      clockOut2: timeSheet.clockOut2, 
      clockIn3: timeSheet.clockIn3, 
      clockOut3: timeSheet.clockOut3
    })
     res.status(200).json({TimeSheet:Timesheet.toObject({getters:true})});

  } catch (err){
    console.log(err);
    return next(new Error("Failed to update time sheet data."));
  }

  res
    .status(200)
    .json({ timesheet: existingTimesheet.toObject({ getters: true }) });
};

const updateTimesheetFromChatbot = async (req, res) => {

  /*
    Path used to find the timesheet for a specific user and date and update a specific field:
    http://localhost:5000/api/timeData/updateTimesheetFromChatbot/test@ddf.com&2024-03-04

    Example body in raw JSON format:
    {
        "fieldToUpdate": "clockIn", // Example field to update
        "newValue": 8:00 AM // Example new value
    }
 */
  
  
  const email = req.params.email;
  const status = req.params.status;
  const clockin = req.params.clockin;

  try {
      // Ensure the date is parsed correctly
      const targetDate = new Date(date);

      console.log('Updating timesheet for:', email, 'on date:', targetDate);

      const timesheet = await Timesheet.findOne({
          employeeID: email,
          date: targetDate 
      });

      if (!timesheet) {
          return res.status(404).json({ message: 'Timesheet not found for the specified user and date.' });
      }

      // Update the specific field of the timesheet
      timesheet[fieldToUpdate] = newValue;

      // Save the updated timesheet
      await timesheet.save();

      res.status(200).json({ message: 'Timesheet updated successfully.', timesheet });
  } catch (err) {
      console.error('Failed to update timesheet:', err);
      res.status(500).json({ message: 'Internal server error' });
  }
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
exports.updateTimesheetFromChatbot = updateTimesheetFromChatbot;
// exports.deleteTimeData = deleteTimeData;
