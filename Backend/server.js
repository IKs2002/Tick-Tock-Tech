require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');


app.listen(5000, () => console.log("Server is running"));
app.use(express.json());



//Get request for Timesheet infomration 
//testing connection

mongoose.connect("mongodb://ddfRoot:ddfRoot@3.142.252.64:27017/?authSource=timeSheetDB", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected…'))
  .catch(err => console.log(err));

// Define the GET request endpoint for timesheet
app.get('/timeData/:employee_id', (req, res) => {
  const employeeId = req.params.employee_id;
  
  Timesheet.find({ employeeID: employeeId }, (err, timesheets) => { // employeeID is database, employeeId is variable
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(timesheets);
    }
  });
});



