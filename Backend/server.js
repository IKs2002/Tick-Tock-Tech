require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');

const timesheetroutes = require("./routes/timesheet-routes.js");
const userroutes = require("./routes/user-routes.js");
const app = express();

app.use(cors());


app.use(bodyParser.json());
app.use("/api/userData", userroutes);
app.use("/api/timeData", timesheetroutes);

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
