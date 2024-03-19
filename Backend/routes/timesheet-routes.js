const express = require("express");
const router = express.Router();
const Timesheet = require("../models/TimesheetModel");
const timesheetcontroller = require("../controllers/timesheet-controller.js");

router.post("/timesheet", );

router.get("/timeData/:employee_id", timesheetcontroller.getTimeData );

router.put("/timesheet", );

router.delete("/timesheet", );

module.exports = router;
