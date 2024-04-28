const mongoose = require("mongoose");
const User = require("../models/User");
const InactiveUser = require("../models/InactiveUser");
const { createNewUserPayPeriod } = require("./payperiods-controller");
const bcrypt = require("bcrypt");
const Timesheet = require("../models/timeSheet");
const InactiveUserTimesheets = require("../models/InactiveUserTimesheets");

// Function to create a new user with hashed password and initiate their pay period
const createUser = async (req, res, next) => {
  const userData = req.body; // Get user data from request body
  console.log(userData.password); // Log the password (not recommended in production)
  console.log(userData); // Log full user data for debugging

  // Nested function to handle password hashing using bcrypt
  const hashPassword = async (password) => {
    try {
      const salt = await bcrypt.genSalt(10); // Generate a salt with a cost factor of 10
      const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with the salt
      return hashedPassword;
    } catch (error) {
      console.error('Error hashing password:', error);
      throw error; // Handle hashing errors appropriately
    }
  };

  let newUser; // Declare variable for new user
  try {
    newUser = new User(userData); // Create a new user instance with provided data
    newUser.password = await hashPassword(newUser.password); // Hash user's password
    console.log(newUser); // Log the new user object for debugging
    await newUser.save(); // Save the new user to the database
  } catch (err) {
    return next(err); // Pass errors to error handling middleware
  }
  createNewUserPayPeriod(newUser.email); // Create pay period for the new user
  res.status(201).json({ user: newUser.toObject({ getters: true }) }); // Respond with created user data
};

// Function to retrieve user data by email
const getUserData = async (req, res, next) => {
  const email = req.params.uid.split('=')[1]; // Extract email from URL parameter
  let user;
  try {
    user = await User.findOne({ email: email }); // Retrieve user by email
  } catch (err) {
    return next(err); // Pass database errors to error handling middleware
  }

  if (!user) {
    return res.status(404).json({ message: "No user found for this ID" }); // User not found response
  }

  res.status(200).json({ // Return user data
      email: user.email,
      name: user.name,
      status: "Clocked Out", // Default status
      role: user.role,
      locked: false, // Default lock status
  });
};

// Function to retrieve all users from the database
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find(); // Retrieve all users

    const mapUsers = users.map((user) => ({ // Map over retrieved users to format response
      id: user.email,
      name: user.name,
      password: user.password,
      status: user.status,
      role: user.role,
      locked: user.accessLock,
    }));

    res.status(200).json(mapUsers); // Send formatted users data
  } catch (err) {
    console.error(err);
    return next(err); // Handle errors
  }
};

// Function to toggle lock status for a single user
const toggleUserLock = async (req, res, next) => {
  const email = req.params.email; // Get user email from URL parameter
  try {
    const user = await User.findOne({ email: email }); // Find user by email
    if (!user) {
      return res.status(404).json({ message: "User not found." }); // User not found response
    }
    user.accessLock = !user.accessLock; // Toggle the lock status
    await user.save(); // Save the updated user
    res.status(200).json({ user: user.toObject({ getters: true }) }); // Respond with updated user data
  } catch (err) {
    console.error(err);
    return next(new Error("Updating user lock status failed.")); // Handle errors
  }
};

// Function to lock or unlock all users at once
const toggleAllUserLocks = async (req, res, next) => {
  const { lockAll } = req.body; // Retrieve desired lock status from request body

  try {
    await User.updateMany({}, { $set: { accessLock: lockAll } }); // Update lock status for all users

    res.status(200).json({ message: `All users have been ${lockAll ? "locked" : "unlocked"}.` }); // Respond with lock/unlock confirmation
  } catch (err) {
    console.error(err);
    return next(new Error(`Failed to ${lockAll ? "lock" : "unlock"} all users.`)); // Handle errors
  }
};



const deleteUserData = async (req, res, next) => {
  const email = req.query.email; // Retrieve user's email from query parameters
  try {
    const user = await User.findOne({ email: email }); // Look up user by email
    if (!user) {
      return res.status(404).json({ message: "No user found with the provided email." }); // Handle user not found
    }

    // Generate a unique inactive email identifier
    const currentDateAndTime = new Date().toISOString().replace('T', '_').substring(0, 19);
    const inactiveEmail = `${email}_inactive_${currentDateAndTime}`;

    // Create an entry in the InactiveUser collection using the current user's data
    const inactiveUser = new InactiveUser({
      ...user.toObject(),
      email: inactiveEmail,
      accessLock: true,
    });
    await inactiveUser.save(); // Save the new inactive user

    // Update all timesheets from this user to the new inactive email
    await Timesheet.updateMany({ employeeID: email }, { employeeID: inactiveEmail });

    // Transfer timesheets to InactiveUserTimesheets collection for archiving
    await InactiveUserTimesheets.insertMany(await Timesheet.find({ employeeID: inactiveEmail }));

    // Delete original timesheets after transferring
    await Timesheet.deleteMany({ employeeID: inactiveEmail });

    // Remove the active user from the User collection
    await User.deleteOne({ email: email });

    res.status(200).json({ message: "User and timesheets updated successfully." }); // Confirm successful operation
  } catch (err) {
    console.error(err);
    return next(new Error("Failed to mark the user as inactive and update timesheets."));
  }
};

const editUserData = async (req, res, next) => {
  const email = req.params.email; // Extract user's email from URL parameter
  const updatedData = req.body; // Retrieve updated data from request body

  try {
    const user = await User.findOne({ email: email }); // Find user by email
    if (!user) {
      return res.status(404).json({ message: "User not found." }); // Handle user not found
    }

    // Update user fields, rehash password if it was changed
    if (updatedData.password) {
      updatedData.password = await bcrypt.hash(updatedData.password, 10); // Hash new password
    }
    
    // Apply updates from provided data, or keep old values if not specified
    user.name = updatedData.name || user.name;
    user.email = updatedData.email || user.email;
    user.password = updatedData.password || user.password;
    user.role = updatedData.role || user.role;
    user.permission = updatedData.permission || user.permission;
    await user.save(); // Save updated user data

    res.status(200).json({ user: user.toObject({ getters: true }) }); // Send updated user data back
  } catch (err) {
    console.error(err);
    return next(new Error("Failed to update user data."));
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body; // Extract login credentials from request body
  try {
    const user = await User.findOne({ email }); // Find user by email

    if (!user) {
      return res.status(404).json({ message: "User does not exist" }); // Handle user not found
    }

    // Check if the account is locked and user is not an admin
    if (user.accessLock === true && user.role !== "admin") {
      res.status(401).json({message: "Account is Locked. Contact Admin"});
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect Username or Password" }); // Handle password mismatch
    } else {
      // Login successful, return user details
      res.status(200).json({
        email: user.email,
        name: user.name,
        status: user.status || "Clocked Out",
        locked: user.locked,
        role: user.role
      });
    }
  } catch (err) {
    return next(err); // Handle other errors
  }
};

// Export functions for use elsewhere in the application
exports.createUser = createUser;
exports.getUserData = getUserData;
exports.getAllUsers = getAllUsers;
exports.toggleUserLock = toggleUserLock;
exports.toggleAllUserLocks = toggleAllUserLocks;
exports.editUserData = editUserData;
exports.deleteUserData = deleteUserData;
exports.login = login;