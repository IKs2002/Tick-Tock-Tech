// THIS FILE IS ALL ROUTES FOR THE USERS FUNCTIONS IN THIS APPLICATION
const express = require("express");
const router = express.Router();

const usercontroller = require("../controllers/user-controller"); 

router.post("/login", usercontroller.login);

router.post("/post",usercontroller.createUser); // Create user

router.get("/getuser/:uid", usercontroller.getUserData ); // Read user

router.get("/getAll", usercontroller.getAllUsers); // Get all users

router.patch("/toggleLock/:email", usercontroller.toggleUserLock); // lock/unlock user

router.patch("/toggleAllLocks", usercontroller.toggleAllUserLocks); // lock/unlock all users

router.patch("/patchuser/:email", usercontroller.editUserData); // Update user (edit user info)

router.delete("/delete", usercontroller.deleteUserData); // Delete user

module.exports = router;[[]]