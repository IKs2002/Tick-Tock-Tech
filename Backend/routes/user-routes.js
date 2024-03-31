const express = require("express");
const router = express.Router();

const usercontroller = require("../controllers/user-controller"); 

router.post("/post",usercontroller.createUser); // Create user

router.get("/getuser/:uid", usercontroller.getUserData ); // Read user

router.get("/getAll", usercontroller.getAllUsers); // Get all users

router.patch("/toggleLock/:email", usercontroller.toggleUserLock); // lock/unlock user

router.patch("/toggleAllLocks", usercontroller.toggleAllUserLocks); // lock/unlock all users

router.delete("/delete", usercontroller.deleteUserData); // Delete user

module.exports = router;[[]]