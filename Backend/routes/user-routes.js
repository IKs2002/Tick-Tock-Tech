const express = require("express");
const router = express.Router();

const usercontroller = require("../controllers/user-controller"); 

router.post("/post",usercontroller.createUser); // Create user

router.get("/getuser/:uid", usercontroller.getUserData ); // Read user

router.get("/getAll", usercontroller.getAllUsers); // Get all users

router.put("/timesheet", ); // Update user

router.delete("/delete/:uid", usercontroller.deleteUserData);
module.exports = router;[[]]