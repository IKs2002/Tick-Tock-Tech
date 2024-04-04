const mongoose = require("mongoose");
const User = require("../models/User");
const InactiveUser = require("../models/InactiveUser");

const createUser = async (req, res, next) => {
  const userData = req.body;
  console.log(userData);
  let newUser;
  try {
    newUser = new User(userData);
    console.log(newUser);
    await newUser.save();
  } catch (err) {
    return next(err);
  }

  res.status(201).json({ user: newUser.toObject({ getters: true }) });
};

const getUserData = async (req, res, next) => {
  let user;
  try {
    user = await User.findOne({ employeeID: email });
  } catch (err) {
    return next(err);
  }

  if (!user) {
    return res.status(404).json({ message: "No user found for this ID" });
  }
  res.status(200).json({
    user: {
      id: user.email,
      name: user.name,
      status: "Clocked Out",
      role: user.role,
      locked: false,
    },
  });
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    const mapUsers = users.map((user) => ({
      id: user.email,
      name: user.name,
      status: "Clocked Out",
      role: user.role,
      locked: user.accessLock,
    }));

    res.status(200).json(mapUsers);
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const toggleUserLock = async (req, res, next) => {
  const email = req.params.email;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    // Toggle the accessLock status
    user.accessLock = !user.accessLock;
    await user.save();
    res.status(200).json({ user: user.toObject({ getters: true }) });
  } catch (err) {
    console.error(err);
    return next(new Error("Updating user lock status failed."));
  }
};

const toggleAllUserLocks = async (req, res, next) => {
  const { lockAll } = req.body;

  try {
    await User.updateMany({}, { $set: { accessLock: lockAll } });

    res.status(200).json({ message: `All users have been ${lockAll ? "locked" : "unlocked"}.` });
  } catch (err) {
    console.error(err);
    return next(new Error(`Failed to ${lockAll ? "lock" : "unlock"} all users.`));
  }
};


const deleteUserData = async (req, res, next) => {
  const email = req.query.email;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "No user found with the provided email." });
    }
  
    const currentDateAndTime = new Date().toISOString().replace('T', '_').substring(0, 19);

    const inactiveUser = new InactiveUser({
      ...user.toObject(),
      email: `${email}_inactive_${currentDateAndTime}`,
      accessLock: true,
    });
    await inactiveUser.save();
    
    await User.deleteOne({ email: email });

    res.status(200).json({ message: "User marked as inactive successfully." });
  } catch (err) {
    console.error(err);
    return next(new Error("Failed to mark the user as inactive."));
  }
};

const editUserData = async (req, res, next) => {
  const email = req.params.email; // Assuming you're using the user's ID in the URL
  const updatedData = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update user fields
    user.name = updatedData.name || user.name;
    user.email = updatedData.email || user.email;
    user.password = updatedData.password || user.password;
    user.role = updatedData.role || user.role;
    user.permission = updatedData.permission || user.permission;

    await user.save();

    // Assuming you have a Timesheet model and want to update the user's info in related timesheets
    // This is a simplistic approach; adjust according to your actual timesheet schema and requirements
    await Timesheet.updateMany({ "user.id": id }, { "user.name": updatedData.name, "user.email": updatedData.email });

    res.status(200).json({ user: user.toObject({ getters: true }) });
  } catch (err) {
    console.error(err);
    return next(new Error("Failed to update user data."));
  }
};


exports.createUser = createUser;
exports.getUserData = getUserData;
exports.getAllUsers = getAllUsers;
exports.toggleUserLock = toggleUserLock;
exports.toggleAllUserLocks = toggleAllUserLocks;
exports.editUserData = editUserData;
exports.deleteUserData = deleteUserData;
