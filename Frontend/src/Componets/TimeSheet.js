import React, { useState } from "react";
import "./TimeSheet.css";
//import { format as formatDate } from "date-fns";
import moment from "moment";
//import moment from 'moment' //we will need this to switch between 24 horu and AM/PM
//import DataTable from "react-data-table-component";


let WeekRegular = 0.00;
let WeekOvertime = 0.00;
let DayRegular = 0.00;
let firstHalfOvertime = 0.00;
let secondHalfOvertime = 0.00;

// Main component function
const EditableTimeSheet = ({ children, editable = true, name='',row=''}) => (
  <td contentEditable={editable} suppressContentEditableWarning className={"timeSheetData " + row} name={name}>{children}</td>
);

function roundUpToNearestHalfHour(hours) {
    // Calculate full hours and leftover minutes
    const fullHours = Math.floor(hours);
    const minutes = (hours - fullHours) * 60;

    // Determine the next nearest half hour
    let roundedHours;
    if (minutes === 0) {
        // If exactly on the hour, no rounding needed
        roundedHours = hours;
    } else if (minutes <= 30) {
        // If minutes are less than or equal to 30, round up to the next half hour
        roundedHours = fullHours + 0.5;
    } else {
        // Otherwise, round up to the next full hour
        roundedHours = fullHours + 1;
    }

    return roundedHours;
}

function TimeSheet({ editable = false, timeData }) {
  // Reset overtime hours at the beginning of each week calculation
  firstHalfOvertime = 0.00;
  secondHalfOvertime = 0.00;

  // Initialize variables to track total regular and overtime hours for the first week
  let totalRegularHoursFirstWeek = 0;
  let totalOvertimeHoursFirstWeek = 0;
  // Initialize variables to track total regular and overtime hours for the second week
  let totalRegularHoursSecondWeek = 0;
  let totalOvertimeHoursSecondWeek = 0;

  // Function to calculate and split hours between regular and overtime for the first week
  const splitHoursFirstWeek = (hours) => {
    let regularHours = hours;
    let overtimeHours = 0;

    // If adding the hours exceeds 40, split into regular and overtime
    if (totalRegularHoursFirstWeek + hours > 40) {
      regularHours = 40 - totalRegularHoursFirstWeek;
      overtimeHours = hours - regularHours;
    }

    // Update total regular and overtime hours for the first week
    totalRegularHoursFirstWeek += regularHours;
    totalOvertimeHoursFirstWeek += overtimeHours;

    return { regularHours, overtimeHours };
  };

  // Function to calculate and split hours between regular and overtime for the second week
  const splitHoursSecondWeek = (hours) => {
    let regularHours = hours;
    let overtimeHours = 0;

    // If adding the hours exceeds 40, split into regular and overtime
    if (totalRegularHoursSecondWeek + hours > 40) {
      regularHours = 40 - totalRegularHoursSecondWeek;
      overtimeHours = hours - regularHours;
    }

    // Update total regular and overtime hours for the second week
    totalRegularHoursSecondWeek += regularHours;
    totalOvertimeHoursSecondWeek += overtimeHours;

    return { regularHours, overtimeHours };
  };

  // Calculate the midpoint of the timeData array
  const midpoint = Math.ceil(timeData.length / 2);

  // Split the timeData array into two halves
  const firstHalf = timeData.slice(0, midpoint);
  const secondHalf = timeData.slice(midpoint);

  // Function to calculate hours between two time strings in AM/PM format
  const calculateHours = (clockIn, clockOut) => {
    if (!clockIn || !clockOut) {
      return 0; // Treat missing entries as 0 hours
    }
    const format = "h:mm A";
    const diff = moment(clockOut, format).diff(moment(clockIn, format), 'hours', true);
    return diff;
  };

  // Convert decimal hours to time format (hours and minutes)
  const convertToTimeFormat = (hours) => {
    const totalHours = Math.floor(hours);
    const totalMinutes = Math.round((hours - totalHours) * 60);
    return `${totalHours}h ${totalMinutes}m`;
  };

  // Calculate and accumulate daily regular hours for the first half
  let firstHalfRegular = firstHalf.reduce((total, val) => {
    const hours = calculateHours(val.clockIn1, val.clockOut1) + calculateHours(val.clockIn2, val.clockOut2) + calculateHours(val.clockIn3, val.clockOut3);
    const roundedHours = roundUpToNearestHalfHour(hours); // Round up to nearest half hour
    return total + roundedHours;
  }, 0);

  // Calculate and accumulate daily regular hours for the second half
  let secondHalfRegular = secondHalf.reduce((total, val) => {
    const hours = calculateHours(val.clockIn1, val.clockOut1) + calculateHours(val.clockIn2, val.clockOut2) + calculateHours(val.clockIn3, val.clockOut3);
    const roundedHours = roundUpToNearestHalfHour(hours); // Round up to nearest half hour
    return total + roundedHours;
  }, 0);

  // Distribute overtime hours if regular hours exceed 40 for the first half
  if (firstHalfRegular > 40) {
    firstHalfOvertime = firstHalfRegular - 40;
    firstHalfRegular = 40;
  }

  // Distribute overtime hours if regular hours exceed 40 for the second half
  if (secondHalfRegular > 40) {
    secondHalfOvertime = secondHalfRegular - 40;
    secondHalfRegular = 40;
  }
  
  // Convert firstHalfRegular to time format
  const firstWeekRegular = convertToTimeFormat(firstHalfRegular);

  // Convert secondHalfRegular to time format
  const secondWeekRegular = convertToTimeFormat(secondHalfRegular);

  // Calculate total weekly regular hours
  WeekRegular = firstHalfRegular + secondHalfRegular;

  // Convert WeekRegular to time format
  const PayPeriodRegular = convertToTimeFormat(WeekRegular);

  // Calculate total weekly overtime hours
  WeekOvertime = firstHalfOvertime + secondHalfOvertime;

  // Convert WeekOvertime to time format
  const firstWeekOvertime = convertToTimeFormat(firstHalfOvertime);
  const secondWeekOvertime = convertToTimeFormat(secondHalfOvertime);

    // Convert PayperiodOvertime to time format
  const PayPeriodOvertime = convertToTimeFormat(WeekOvertime);

  console.log(timeData);
  return (
    <div className="App">
      {/* Timesheet table section */}
      <section className="Timesheet-Table">
        <table>
          {/* Table headers */}
          <thead>
          <tr>
            <th>Day</th>
            <th>Date</th>
            <th>Clock In</th>
            <th>Clock out</th>
            <th></th>
            <th>Clock In</th>
            <th>Clock out</th>
            <th></th>
            <th>Clock In</th>
            <th>Clock out</th>
            <th></th>
            <th>Project</th>
            <th>Regular</th>
            <th>Overtime</th>
          </tr>
          </thead>
          {/* Mapping data to table rows */}
          <tbody>
          {firstHalf.map((val, key) => {

            let dayHours = calculateHours(val.clockIn1, val.clockOut1) + calculateHours(val.clockIn2, val.clockOut2) + calculateHours(val.clockIn3, val.clockOut3);
            dayHours = roundUpToNearestHalfHour(dayHours); // Round up to nearest half hour

            // Split hours between regular and overtime for the first week
            const { regularHours, overtimeHours } = splitHoursFirstWeek(dayHours);

            const Regularhours = Math.floor(regularHours);
            const Regularminutes = Math.round((regularHours - Regularhours) * 60);
            const Overtimehours = Math.floor(overtimeHours);
            const Overtimeminutes = Math.round((overtimeHours - Overtimehours) * 60);

            return (
              <tr key={key}>
                {/* Displaying each piece of data in its respective column */}
                <td className={"timeSheetData Row" + ( key)} name="day">{val.day}</td>
                <td className={"timeSheetData Row" + ( key)} name="date"> {moment.utc(val.date).format("MM-DD-YY")}</td>
                <EditableTimeSheet editable={editable} row={"Row"+key} name="clockIn1">
                  {val.clockIn1}
                </EditableTimeSheet>
                <EditableTimeSheet editable={editable} row={"Row"+key} name="clockOut1">
                  {val.clockOut1}
                </EditableTimeSheet>
                <td></td>
                <EditableTimeSheet editable={editable} row={"Row"+key} name="clockIn2">
                  {val.clockIn2}
                </EditableTimeSheet>
                <EditableTimeSheet editable={editable} row={"Row"+key} name="clockOut2">
                  {val.clockOut2}
                </EditableTimeSheet>
                <td></td>
                <EditableTimeSheet editable={editable} row={"Row"+key} name="clockIn3">
                  {val.clockIn3}
                </EditableTimeSheet>
                <EditableTimeSheet editable={editable} row={"Row"+key} name="clockOut3">
                  {val.clockOut3}
                </EditableTimeSheet>
                <td></td>
                <EditableTimeSheet editable={editable} row={"Row"+key} name="project">
                  {val.project}
                </EditableTimeSheet>
                <td>
                  {/* Display calculated total hours worked in decimal form or '0.0' if no entry */}
                  {regularHours ? `${Regularhours}:${Regularminutes}` : '0:00'} 
                </td>
                <td>
                  {/* Display calculated total hours worked in decimal form or '0.0' if no entry */}
                  {overtimeHours ? `${Overtimehours}:${Overtimeminutes}` : '0:00'}
                </td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </section>

      {/* Weekly total hours section */}
      <section className="Timesheet-TotalHours">
        <table>
          {/* Headers for the total hours table */}
          <thead>
          <tr>
            <th></th>
            <th>Regular Hours</th>
            <th>Overtime Hours</th>
          </tr>
          </thead><tbody>
          {/* Mapping weekly totals to table rows */}
              <tr>
                <th>Total this Week</th>
                {/* Displaying total regular and overtime hours */}
                <th>{firstWeekRegular}</th>
                <th>{firstWeekOvertime}</th>
              </tr>
          </tbody>
        </table>
      </section>

      {/* Duplicate timesheet table section */}
      <section className="Timesheet-Table">
        <table>
          {/* Similar structure to the first timesheet table */}
          <thead>
          <tr>
            <th>Day</th>
            <th>Date</th>
            <th>Clock In</th>
            <th>Clock out</th>
            <th></th>
            <th>Clock In</th>
            <th>Clock out</th>
            <th></th>
            <th>Clock In</th>
            <th>Clock out</th>
            <th></th>
            <th>Project</th>
            <th>Regular</th>
            <th>Overtime</th>
          </tr>
          </thead>
          <tbody>
          {secondHalf.map((val, key) => {
            
            DayRegular = calculateHours(val.clockIn1, val.clockOut1) + calculateHours(val.clockIn2, val.clockOut2) + calculateHours(val.clockIn3, val.clockOut3);
            DayRegular = roundUpToNearestHalfHour(DayRegular); // Round up to nearest half hour

            // Split hours between regular and overtime for the second week
            const { regularHours, overtimeHours } = splitHoursSecondWeek(DayRegular);

            const Regularhours = Math.floor(regularHours);
            const Regularminutes = Math.round((regularHours - Regularhours) * 60);
            const Overtimehours = Math.floor(overtimeHours);
            const Overtimeminutes = Math.round((overtimeHours - Overtimehours) * 60);

            let prevRows = 7;
            return (
              
              <tr key={key}>
                <td className={"timeSheetData Row" + (prevRows + key)} name="day">{val.day}</td>
                <td className={"timeSheetData Row" + (prevRows + key)} name="date"> {moment.utc(val.date).format("MM-DD-YY")}</td>
                <EditableTimeSheet editable={editable} name="clockIn1" row={"Row" + (prevRows+key) }>
                  {val.clockIn1}
                </EditableTimeSheet>
                <EditableTimeSheet editable={editable} name="clockOut1" row={"Row" + (prevRows+key) }>
                  {val.clockOut1}
                </EditableTimeSheet>
                <td></td>
                <EditableTimeSheet editable={editable} name="clockIn2" row={"Row" + (prevRows+key) }>
                  {val.clockIn2}
                </EditableTimeSheet>
                <EditableTimeSheet editable={editable} name="clockOut2" row={"Row" + (prevRows+key) }>
                  {val.clockOut2}
                </EditableTimeSheet>
                <td></td>
                <EditableTimeSheet editable={editable} name="clockIn3" row={"Row" + (prevRows+key) }>
                  {val.clockIn3}
                </EditableTimeSheet>
                <EditableTimeSheet editable={editable} name="clockOut3" row={"Row" + (prevRows+key) }>
                  {val.clockOut3}
                </EditableTimeSheet>
                <td></td>
                <EditableTimeSheet editable={editable} name="project" row={"Row" + (prevRows+key) }>
                  {val.project}
                </EditableTimeSheet>
                <td>
                  {/* Display calculated total hours worked in decimal form or '0.0' if no entry */}
                  {regularHours? `${Regularhours}:${Regularminutes}` : '0:00'} 
                </td>
                <td>
                  {/* Display calculated total hours worked in decimal form or '0.0' if no entry */}
                  {overtimeHours? `${Overtimehours}:${Overtimeminutes}` : '0:00'}
                </td>
              </tr>
              
            );
          })}
          </tbody>
        </table>
      </section>

      {/* Weekly total hours section */}
      <section className="Timesheet-TotalHours">
        <table>
          {/* Headers for the total hours table */}
          <thead>
          <tr>
            <th></th>
            <th>Regular Hours</th>
            <th>Overtime Hours</th>
          </tr></thead><tbody>
          {/* Mapping weekly totals to table rows */}
              <tr>
                <th>Total this Week</th>
                {/* Displaying total regular and overtime hours */}
                <th>{secondWeekRegular}</th>
                <th>{secondWeekOvertime}</th>
              </tr>
          </tbody>
        </table>
      </section>

      {/* Pay period summary section */}
      <section className="Timesheet-PayPeriod">
        <table>
          {/* Headers for the pay period summary table */}
          <thead>
          <tr>
            <th></th>
            <th>Regular Hours</th>
            <th>Overtime Hours</th>
          </tr>
          </thead>
          <tbody>
              <tr>
                <td>Total Per Period</td>
                {/* Displaying total regular and overtime hours for the pay period */}
                <td>{PayPeriodRegular}</td>
                <td>{PayPeriodOvertime}</td>
              </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default TimeSheet;
