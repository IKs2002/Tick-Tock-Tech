const mongoose = require("mongoose");
const User = require("../models/User");

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
  const uid = req.params.uid;

  console.log(uid);

  let user;
  try {
    user = await User.findOne({ employeeID: uid });
  } catch (err) {
    return next(err);
  }

  if (!user) {
    return res.status(404).json({ message: "No user found for this ID" });
  }
  res.status(200).json({
    user: {
      id: user._id,
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
      locked: false,
    }));

    res.status(200).json(mapUsers);
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

// const updateUserData = async (req, res, next) =>{
//     try{

//     }
// }

const deleteUserData = async (req, res, next) => {
  const uid = req.params.uid;
  let user;
  try {
    const deletedUser = await User.findOneAndDelete({ employeeID: uid });

    if (!deletedUser) {
      return res
        .status(404)
        .json({ message: "No user found with the provided ID." });
    }

    res.status(200).json({ message: "User deleted successfully." });
  } catch (err) {
    console.error(err);
    return next(new Error("Failed to delete the User."));
  }
};

exports.createUser = createUser;
exports.getUserData = getUserData;
exports.getAllUsers = getAllUsers;
exports.deleteUserData = deleteUserData;
