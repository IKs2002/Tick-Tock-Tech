const express = require("express");
const router = express.Router();

const usercontroller = require("../controllers/user-controller.js"); 

router.post("/userData/create",usercontroller.createUser); // Create user

router.get("/userData/:uid", usercontroller.getUserData ); // Read user

router.put("/timesheet", ); // Update user

router.delete("/timesheet", ); // Delete user

module.exports = router;