const express = require("express");
const router = express.Router();

const timesheetcontroller = require("../controllers/timesheet-controller.js");

router.post("/create",timesheetcontroller.createTimesheet); //

router.get("get/:tid", timesheetcontroller.getTimeData);

router.put("put/:tid", timesheetcontroller.updateTimeData);

// router.delete("/delete/:tid", timesheetcontroller.deleteTimeData);

module.exports = router;
