import React, { useState } from "react";
import "./TimeSheet.css";
//import { format as formatDate } from "date-fns";
import moment from "moment";
//import moment from 'moment' //we will need this to switch between 24 horu and AM/PM
//import DataTable from "react-data-table-component";


// Pay period data, likely intended for summary information
const Paydata = [{ PeriodRegular: "000", PeriodOvertime: "000" }];

// Weekly total hours, for summarizing at the end of a week
const WeekTotal = [{ Regular: "000", Overtime: "000" }];

// Main component function
const EditableTimeSheet = ({ children, editable = true, name='', row}) => (
  <td contentEditable={editable} suppressContentEditableWarning className={"timeSheetData " + row} name={name}>{children}</td>
);

function TimeSheet({ editable = false, timeData }) {
  // Calculate the midpoint of the timeData array
  const midpoint = Math.ceil(timeData.length / 2);

  // Split the timeData array into two halves
  const firstHalf = timeData.slice(0, midpoint);
  const secondHalf = timeData.slice(midpoint);

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
            // Calculate the time difference in hours and minutes for each period
            let hoursWorked1 = 0;
            if (val.clockIn1 && val.clockOut1) {
                const clockIn1 = moment(val.clockIn1, 'h:mm A');
                const clockOut1 = moment(val.clockOut1, 'h:mm A');
                hoursWorked1 = clockOut1.diff(clockIn1, 'minutes') / 60;
            }

            let hoursWorked2 = 0;
            if (val.clockIn2 && val.clockOut2) {
                const clockIn2 = moment(val.clockIn2, 'h:mm A');
                const clockOut2 = moment(val.clockOut2, 'h:mm A');
                hoursWorked2 = clockOut2.diff(clockIn2, 'minutes') / 60;
            }

            let hoursWorked3 = 0;
            if (val.clockIn3 && val.clockOut3) {
                const clockIn3 = moment(val.clockIn3, 'h:mm A');
                const clockOut3 = moment(val.clockOut3, 'h:mm A');
                hoursWorked3 = clockOut3.diff(clockIn3, 'minutes') / 60;
            }

            let totalHoursWorked = hoursWorked1 + hoursWorked2 + hoursWorked3;

            let overtimeHours = 0;
            if (totalHoursWorked > 8) {
              overtimeHours = totalHoursWorked - 8;
              totalHoursWorked = 8;
            }

            const hours = Math.floor(totalHoursWorked);
            const minutes = Math.round((totalHoursWorked - hours) * 60);

            const overtimeHoursDisplay = Math.floor(overtimeHours);
            const overtimeMinutes = Math.round((overtimeHours - overtimeHoursDisplay) * 60);

            return (
              <tr key={key}>
                {/* Displaying each piece of data in its respective column */}
                <td className={"timeSheetData Row" + key} name="day">{val.day}</td>
                <td className={"timeSheetData Row" + key} name="date"> {moment.utc(val.date).format("MM-DD-YY")}</td>
                <EditableTimeSheet editable={editable} name="clockIn1" row={"Row" + key }>
                  {val.clockIn1}
                </EditableTimeSheet>
                <EditableTimeSheet editable={editable} name="clockOut1" row={"Row" + key }>
                  {val.clockOut1}
                </EditableTimeSheet>
                <td></td>
                <EditableTimeSheet editable={editable} name="clockIn2" row={"Row" + key }>
                  {val.clockIn2}
                </EditableTimeSheet>
                <EditableTimeSheet editable={editable} name="clockOut2" row={"Row" + key }>
                  {val.clockOut2}
                </EditableTimeSheet>
                <td></td>
                <EditableTimeSheet editable={editable} name="clockIn3" row={"Row" + key }>
                  {val.clockIn3}
                </EditableTimeSheet>
                <EditableTimeSheet editable={editable} name="clockOut3" row={"Row" + key }>
                  {val.clockOut3}
                </EditableTimeSheet>
                <td></td>
                <EditableTimeSheet editable={editable} name="project" row={"Row" + key }>
                  {val.project}
                </EditableTimeSheet>
                <td>
                  {totalHoursWorked ? `${hours}.${minutes}` : '0.0'} {/* Display calculated total hours worked in decimal form or '0.0' if no entry */}
                </td>
                <td>
                  {overtimeHours ? `${overtimeHoursDisplay}.${overtimeMinutes}` : '0.0'} {/* Display overtime hours in decimal form or '0.0' if no overtime */}
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
          
          {WeekTotal.map((val, key) => {
            return (
              <tr key={key}>
                <th>Total this Week</th>
                {/* Displaying total regular and overtime hours */}
                <th>{val.Regular}</th>
                <th>{val.Overtime}</th>
              </tr>
            );
          })}
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
            // Calculate the time difference in hours and minutes for each period in the second half
            let hoursWorked1 = 0;
            if (val.clockIn1 && val.clockOut1) {
                const clockIn1 = moment(val.clockIn1, 'h:mm A');
                const clockOut1 = moment(val.clockOut1, 'h:mm A');
                hoursWorked1 = clockOut1.diff(clockIn1, 'minutes') / 60;
            }

            let hoursWorked2 = 0;
            if (val.clockIn2 && val.clockOut2) {
                const clockIn2 = moment(val.clockIn2, 'h:mm A');
                const clockOut2 = moment(val.clockOut2, 'h:mm A');
                hoursWorked2 = clockOut2.diff(clockIn2, 'minutes') / 60;
            }

            let hoursWorked3 = 0;
            if (val.clockIn3 && val.clockOut3) {
                const clockIn3 = moment(val.clockIn3, 'h:mm A');
                const clockOut3 = moment(val.clockOut3, 'h:mm A');
                hoursWorked3 = clockOut3.diff(clockIn3, 'minutes') / 60;
            }

            let totalHoursWorked = hoursWorked1 + hoursWorked2 + hoursWorked3;

            let overtimeHours = 0;
            if (totalHoursWorked > 8) {
              overtimeHours = totalHoursWorked - 8;
              totalHoursWorked = 8;
            }

            const hours = Math.floor(totalHoursWorked);
            const minutes = Math.round((totalHoursWorked - hours) * 60);

            const overtimeHoursDisplay = Math.floor(overtimeHours);
            const overtimeMinutes = Math.round((overtimeHours - overtimeHoursDisplay) * 60);

            let prevRows = 7;
            return (
              
              <tr key={key}>
                {/* Displaying each piece of data in its respective column */}
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
                  {totalHoursWorked ? `${hours}.${minutes}` : '0.0'} {/* Display calculated total hours worked for the second half in decimal form or '0.0' if no entry */}
                </td>
                <td>
                  {overtimeHours ? `${overtimeHoursDisplay}.${overtimeMinutes}` : '0.0'} {/* Display overtime hours in decimal form or '0.0' if no overtime */}
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
          {WeekTotal.map((val, key) => {
            return (
              <tr key={key}>
                <th>Total this Week</th>
                {/* Displaying total regular and overtime hours */}
                <th>{val.Regular}</th>
                <th>{val.Overtime}</th>
              </tr>
            );
          })}
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
          {/* Mapping pay period data to table rows */}
          {Paydata.map((val, key) => {
            return (
              <tr key={key}>
                <td>Total Per Period</td>
                {/* Displaying total regular and overtime hours for the pay period */}
                <td>{val.PeriodRegular}</td>
                <td>{val.PeriodOvertime}</td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default TimeSheet;
