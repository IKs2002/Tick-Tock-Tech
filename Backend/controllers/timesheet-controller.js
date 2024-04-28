const mongoose = require("mongoose");
const Timesheet = require("../models/timeSheet");
const User = require("../models/User");

// Function to create a new timesheet from a POST request
const createTimesheet = async (req, res, next) => {
  const timeData = req.body; // Data received from client
  console.log(timeData); // Log received data for debugging
  let newTimesheet;
  try {
    newTimesheet = new Timesheet(timeData); // Create a new timesheet with the provided data
    console.log(newTimesheet); // Log new timesheet for debugging
    await newTimesheet.save(); // Save the new timesheet to the database
  } catch (err) {
    return next(err); // Pass errors to the next middleware
  }

  res.status(201).json({ Timesheet: newTimesheet.toObject({ getters: true }) }); // Send the created timesheet back to the client
};

// Function to retrieve timesheet data based on user ID and date range
const getTimeData = async (req, res, next) => {
  const uid = req.params.uid.split('=')[1]; // Extract user ID from request parameters
  let startDate = new Date(req.params.startDate); // Convert startDate string to Date object
  let endDate = new Date(req.params.endDate); // Convert endDate string to Date object
  
  // Normalize start and end dates to cover whole days in UTC
  startDate.setUTCHours(0, 0, 0, 0);
  endDate.setUTCHours(23, 59, 59, 999);

  let timesheets;
  try {
    timesheets = await Timesheet.find({
      employeeID: uid,
      date: {$gte: startDate, $lte: endDate},
    });
  } catch (err) {
    return next(err);
  }

  if (!timesheets || timesheets.length === 0) {
    return res.status(404).json({
        message: "No timesheets found for this user within the specified date range."
      });
  }

  res.status(200).json({
    timesheets: timesheets.map(timesheet => timesheet.toObject({ getters: true }))
  });
};

// Function to update specific timesheet data
const updateTimeData = async (req, res, next) => {
  const updatedData = req.body; // Get the updated data from the client
  try {
    const filter = { day: updatedData.day, date: updatedData.date, employeeID:updatedData.employeeID};
    const update = { $set: updatedData };
    const result = await Timesheet.updateOne(filter, update);

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "No matching timesheet found to update." });
    }

    res.status(200).json({ message: "Timesheet updated successfully." });
  } catch (err) {
    return next(new Error("Failed to update time sheet data."));
  }
};

// Function to handle timesheet updates from a chatbot interface
const updateTimesheetFromChatbot = async (req, res) => {
  try {
    const email = req.params.email;
    const status = req.params.status;
    const clockin = req.params.clockin;
    const targetDate = new Date();
    targetDate.setUTCHours(0, 0, 0, 0);
    console.log('Updating timesheet for:', email, 'on date:', targetDate);

    const timesheet = await Timesheet.findOne({
      employeeID: email,
      date: targetDate
    });

    if (!timesheet) {
      return res.status(404).json({ message: 'Timesheet not found for the specified user and date.' });
    }

    if (clockin && status !== "Break") {
      let emptyProperty;
      for (const prop of ['clockIn1', 'clockOut1', 'clockIn2', 'clockOut2', 'clockIn3', 'clockOut3']) {
        if (!timesheet[prop]) {
          emptyProperty = prop;
          break;
        }
      }

      if (emptyProperty) {
        await Timesheet.updateOne({ _id: timesheet._id }, { $set: { [emptyProperty]: clockin } });
      }
    }

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

// Exports for each function to be used in other parts of the application
exports.getTimeData = getTimeData;
exports.createTimesheet = createTimesheet;
exports.updateTimeData = updateTimeData;
exports.updateTimesheetFromChatbot = updateTimesheetFromChatbot;
// exports.deleteTimeData = deleteTimeData; // Function commented out, potentially for future use or removal
