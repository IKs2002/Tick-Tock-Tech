const mongoose = require('mongoose');
const Timesheet = require("../models/user");

const createUser = async (req, res, next) => {
    const userData  = req.body;
    console.log(userData)
    let newUser;
    try {
        newUser = new User();
        console.log(newUser);
        await newUser.save();
    }
    catch (err) {
        return next(err);
    }

    res.status(201).json({ user: newUser.toObject({ getters: true }) });
};

exports.createUser = createUser;

const getUserData = async (req, res, next) => {
    const uid = req.params.uid; 

    console.log(uid);
    
    let user;
    try {
        user = await User.findById(uid);
    }
    catch (err) {
        return next(err);
    }

    if (!user) {
        return res.status(404).json({ message: "No user found for this ID" });
    }
    res.status(200).json({ user: user.toObject({ getters: true }) });
};

