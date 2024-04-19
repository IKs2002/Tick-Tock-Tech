const express = require("express");
const router = express.Router();

const timesheetcontroller = require("../controllers/timesheet-controller.js");

router.post("/create", timesheetcontroller.createTimesheet); //

router.get("/get/:uid&:startDate&:endDate", timesheetcontroller.getTimeData);

//router.get("/get/:uid", timesheetcontroller.getTimeData);

router.patch("/patch", timesheetcontroller.updateTimeData);

router.patch('/updateTimesheetFromChatbot/:email&:status&:clockin', timesheetcontroller.updateTimesheetFromChatbot);

// router.delete("/delete/:tid", timesheetcontroller.deleteTimeData);

module.exports = router;
