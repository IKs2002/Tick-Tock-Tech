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
  
    const inactiveUser = new InactiveUser({
      ...user.toObject(),
      email: `${email}_inactive`,
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


exports.createUser = createUser;
exports.getUserData = getUserData;
exports.getAllUsers = getAllUsers;
exports.toggleUserLock = toggleUserLock;
exports.toggleAllUserLocks = toggleAllUserLocks;
exports.deleteUserData = deleteUserData;
