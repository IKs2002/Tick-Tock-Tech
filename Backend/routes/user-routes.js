const express = require("express");
const router = express.Router();

const usercontroller = require("../controllers/user-controller"); 

router.post("/create",usercontroller.createUser); // Create user

//router.get("/:uid", usercontroller.getUserData ); // Read user

//router.put("/timesheet", ); // Update user

//router.delete("/timesheet", ); // Delete user

module.exports = router;