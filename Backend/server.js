require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');
const { createTimesheetPayPeriod } = require("./controllers/payperiods-controller.js");
const cron = require('node-cron');

const timesheetroutes = require("./routes/timesheet-routes.js");
const userroutes = require("./routes/user-routes.js");
const app = express();

app.use(cors());


app.use(bodyParser.json());
app.use("/api/userData", userroutes);
app.use("/api/timeData", timesheetroutes);

app.post('/pay-periods', async (req, res) => {
  
  try {
    const newPayPeriod = await createTimesheetPayPeriod();
    res.status(201).json(newPayPeriod);
  } catch (error) {
    console.error('Error creating the bi-weekly pay period:', error);
    res.status(500).json({ error: error.message }); 
  }
});

//scheduling every 1st and 3rd monday 
cron.schedule('0 1 * * 1', async () => {
  //first 0 is mins
  //second 0 is hours (0=midnight)
  //1 = monday 
  try
  {
    const newPayPeriod = await createTimesheetPayPeriod();
    console.log('pay period created:', newPayPeriod);
  } catch (error) {
      console.error('error creating pay period:', error);
  }
});


mongoose
  .connect(process.env.URI)
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });

//Get request for Timesheet infomration
//testing connection

// Define the GET request endpoint for timesheet
