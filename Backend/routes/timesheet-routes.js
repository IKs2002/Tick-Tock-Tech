const express = require("express");
const router = express.Router();

const timesheetcontroller = require("../controllers/timesheet-controller.js");

router.post("/timesheet", );

router.get("/timeData/:tid", timesheetcontroller.getTimeData );

router.put("/timesheet", );

router.delete("/timesheet", );

module.exports = router;
