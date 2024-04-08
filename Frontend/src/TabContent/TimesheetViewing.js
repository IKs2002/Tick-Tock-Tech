import React, { useState, useEffect } from "react";
import "./TimesheetViewing.css";
import { startOfWeek, addDays, format as formatDate } from "date-fns";
import TimeSheet from "../Componets/TimeSheet.js";
import WeekPicker from "../Componets/WeekPicker.js";
import moment from "moment";

const TimesheetViewing = () => {
  const initialWeekStart = startOfWeek(new Date(), { weekStartsOn:  2});
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

  console.log(firstWeekStart, secondWeekEnd)
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
      console.log(formattedFirstWeekStart, formattedSecondWeekEnd)
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
          <WeekPicker onChange={handleWeekChange} />
        </div>
      </div>
      <div>
        <label class="EmpName">{employeeName}</label>
      </div>
      <container class="tableArea">
        <div class="TimesheetArea">
          <TimeSheet timeData={timeSheetData}/>
        </div>
      </container>
    </div>
  );
};
export default TimesheetViewing;
