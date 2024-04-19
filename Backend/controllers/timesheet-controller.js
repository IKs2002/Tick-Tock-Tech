const mongoose = require("mongoose");
const Timesheet = require("../models/timeSheet");
const User = require("../models/User");
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
  const updatedData = req.body; // Assuming this contains all necessary fields including a unique identifier
  try {
    // Assuming 'day' and 'date' can uniquely identify a document to update 
    const filter = { day: updatedData.day, date: updatedData.date, employeeID:updatedData.employeeID};
    const update = { $set: {
      clockIn1:updatedData.clockIn1, clockIn2:updatedData.clockIn2, clockIn3:updatedData.clockIn3,
      clockOut1:updatedData.clockOut1, clockOut2:updatedData.clockOut2, clockOut3:updatedData.clockOut3,
      project:updatedData.project}}; // Directly use the updatedData object for updating
    const result = await Timesheet.updateOne(filter,update); 

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "No matching timesheet found to update." });
    }

    res.status(200).json({ message: "Timesheet updated successfully." });
    console.log(updatedData);
  } catch (err) {
    return next(new Error("Failed to update time sheet data."));
  }
};

const updateTimesheetFromChatbot = async (req, res) => {
  try {
    const email = req.params.email;
    const status = req.params.status;
    const clockin = req.params.clockin;

    // Ensure the date is parsed correctly
    const targetDate = new Date();
    targetDate.setUTCHours(0, 0, 0, 0);
    console.log('Updating timesheet for:', email, 'on date:', targetDate);

    // Find the timesheet for the specified user and date
    console.log('Searching for timesheet with date:', targetDate);
    const timesheet = await Timesheet.findOne({
      employeeID: email,
      date: targetDate 
    });

    console.log('Found timesheet:', timesheet);
    if (!timesheet) {
      return res.status(404).json({ message: 'Timesheet not found for the specified user and date.' });
    }

    // Define an array of properties to check for emptiness
    const propertiesToCheck = ['clockIn1', 'clockOut1', 'clockIn2', 'clockOut2', 'clockIn3', 'clockOut3'];

    // If clockIn time is provided and status is not "Break", find the first empty property and update it
    if (clockin && status !== "Break") {
      let emptyProperty;
      for (const prop of propertiesToCheck) {
        if (!timesheet[prop]) {
          emptyProperty = prop;
          break; // Stop iterating once we find an empty property
        }
      }
      
      if (emptyProperty) {
        // Construct an update object
        const update = { [emptyProperty]: clockin };
        // Update the timesheet
        await Timesheet.updateOne({ _id: timesheet._id }, { $set: update });
      }
    }

    // Update user status regardless of the timesheet update
    if (status) {
      const user = await User.findOne({ email });
      if (user) {
        user.status = status;
        await user.save();
      }
    }

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
