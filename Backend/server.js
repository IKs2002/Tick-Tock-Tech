require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");

const timesheetroutes = require("./routes/timesheet-routes.js");


app.listen(5000, () => console.log("Server is running"));

mongoose
  .connect(
    process.env.URI
  )
  .then(() => console.log("MongoDB connected…"))
  .catch((err) => console.log(err));


app.use(express.json());
app.use('/api', timesheetroutes);

//Get request for Timesheet infomration
//testing connection



// Define the GET request endpoint for timesheet

