const express = require("express");
const router = express.Router();

const timesheetcontroller = require("../controllers/timesheet-controller.js");

router.post("/timeData/create",timesheetcontroller.createTimesheet); //

router.get("/timeData/:tid", timesheetcontroller.getTimeData);

router.put("/timedata/:tid", timesheetcontroller.updateTimeData);

router.delete("/timesheet", );

module.exports = router;
