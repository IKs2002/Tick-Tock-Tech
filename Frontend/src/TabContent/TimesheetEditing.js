import React, { useState, useEffect } from "react";
import { startOfWeek, addDays, format as formatDate } from "date-fns";
import "./TimesheetEdit.css";
import TimeSheet from "../Componets/TimeSheet.js";
import WeekPicker from "../Componets/WeekPicker.js";
import moment from "moment";

const TimesheetEdit = () => {
  const initialWeekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const initialWeekEnd = addDays(initialWeekStart, 13);
  
  const initialFirstWeekStart = moment(initialWeekStart).startOf("day");
  const initialSecondWeekEnd = moment(initialWeekEnd).endOf("day");

  const [firstWeekStart, setFirstWeekStart] = useState(initialFirstWeekStart.toDate());
  const [secondWeekEnd, setSecondWeekEnd] = useState(initialSecondWeekEnd.toDate());
  const [timeSheetData, setTimeSheetData] = useState([]);
  const [employeeName, setEmployeeName] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");

  const handleWeekChange = (weeks) => {
    const newFirstWeekStart = moment.utc(weeks.beginning.firstWeekStart).toDate();
    const newSecondWeekEnd = moment.utc(weeks.ending.secondWeekEnd).toDate();
  
    setFirstWeekStart(newFirstWeekStart);
    setSecondWeekEnd(newSecondWeekEnd);
  };

  // Save changes Pop-Up confirmation 
  const handleSaveChanges = () => {
    // Display a confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to save changes?");
    if (isConfirmed) {
      // Implement the save logic here
      let timeSheetTableData = [];
      for(let i = 0; i<14; i++){
      let elementList = document.getElementsByClassName("timeSheetData Row" + i);
      let elementObject = {};
      for(let element of elementList){
        elementObject[element.getAttribute("name")] = element.innerText;
      }
      elementObject.employeeID = employeeEmail;
      let dateMMDDYY = elementObject.date.split('-');
      dateMMDDYY[2] = "20" + dateMMDDYY[2]; //Adds a "20" before the year, else it will assume 1924
      dateMMDDYY[0] = "0" + String(Number(dateMMDDYY[0])-1);
      elementObject.date = new Date(dateMMDDYY[2],dateMMDDYY[0],dateMMDDYY[1]);
      elementObject.date.setUTCHours(0, 0, 0, 0);
      elementObject.date.toISOString()
      timeSheetTableData[i] = elementObject;
    }
    console.log(timeSheetTableData);
    timeSheetTableData.forEach((timesheet) => {
      fetch(`http://localhost:5000/api/timeData/patch/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(timesheet),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update timesheet data');
        }
        return response.json();
      })
      .then(data => {
        console.log('Timesheet updated successfully', data);
      })
      .catch(error => {
        console.error('Error updating timesheet:', error);
      });
    });
    } else {
      console.log("Save cancelled");
    }
  };

  useEffect(() => {
    // Parse name and email from URL
    const urlParams = new URLSearchParams(window.location.search);
    const nameFromUrl = urlParams.get("name");
    const emailFromUrl = urlParams.get("email");
    console.log(emailFromUrl);
    setEmployeeName(nameFromUrl);
    setEmployeeEmail(emailFromUrl);
  }, []);
  
  useEffect(() => {
    // Fetch timesheet data when employeeEmail changes
    if (employeeEmail) {
      const uid = employeeEmail; // Assuming email is the user ID
      const formattedFirstWeekStart = firstWeekStart ? formatDate(firstWeekStart, "MM-dd-yy") : null;
      const formattedSecondWeekEnd = secondWeekEnd ? formatDate(secondWeekEnd, "MM-dd-yy") : null;
      
      const fetchTimesheetData = async (uid, firstWeekStart, secondWeekEnd) => {
        const url = `http://localhost:5000/api/timeData/get/uid=${uid}&startDate=${firstWeekStart}&endDate=${secondWeekEnd}`;
  
        try {
          const response = await fetch(url, {
            method: "GET",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          } else {
            const data = await response.json();
            if (data && data.timesheets) {
              setTimeSheetData(data.timesheets);
            }
          }
        } catch (error) {
          console.error("Failed to fetch timesheet data:", error);
        }
      };
  
      fetchTimesheetData(uid, formattedFirstWeekStart, formattedSecondWeekEnd);
    }
  }, [employeeEmail, firstWeekStart, secondWeekEnd]);

  return (
    <div>
      <div className="Week-of">
        <div className="center-container">
          <WeekPicker onChange={handleWeekChange}/>
        </div>
        <button className="SaveChangesButton" onClick={handleSaveChanges}>Save Changes</button> 
      </div>
      <div>
        <label className="EmpName">{employeeName}</label>
      </div>
      <div className="tableArea">
        <div className="TimesheetArea">
          <TimeSheet editable={true} timeData={timeSheetData}/>
        </div>
      </div>
    </div>
  );
};
export default TimesheetEdit;
