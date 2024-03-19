import React from "react";
import "./TimeSheet.css";
//import moment from 'moment' //we will need this to switch between 24 horu and AM/PM
//import DataTable from "react-data-table-component";

// Sample data for timesheet entries
const data = [
  {
    Day: "Monday",
    Date: "## XXX ####",
    Clockin1: "##:## AM",
    Clockout1: "##:## AM",
    Clockin2: "##:## AM",
    Clockout2: "##:## AM",
    Clockin3: "##:## AM",
    Clockout3: "##:## AM",
    Project: "XXXXXXXXXXXXXX",
    Regular: "XX hrs",
    Overtime: "XX hrs",
  },
  {
    Day: "Tuesday",
    Date: "## XXX ####",
    Clockin1: "##:## AM",
    Clockout1: "##:## AM",
    Clockin2: "##:## AM",
    Clockout2: "##:## AM",
    Clockin3: "##:## AM",
    Clockout3: "##:## AM",
    Project: "XXXXXXXXXXXXXX",
    Regular: "XX hrs",
    Overtime: "XX hrs",
  },
  {
    Day: "Wednesday",
    Date: "## XXX ####",
    Clockin1: "##:## AM",
    Clockout1: "##:## AM",
    Clockin2: "##:## AM",
    Clockout2: "##:## AM",
    Clockin3: "##:## AM",
    Clockout3: "##:## AM",
    Project: "XXXXXXXXXXXXXX",
    Regular: "XX hrs",
    Overtime: "XX hrs",
  },
  {
    Day: "Thursday",
    Date: "## XXX ####",
    Clockin1: "##:## AM",
    Clockout1: "##:## AM",
    Clockin2: "##:## AM",
    Clockout2: "##:## AM",
    Clockin3: "##:## AM",
    Clockout3: "##:## AM",
    Project: "XXXXXXXXXXXXXX",
    Regular: "XX hrs",
    Overtime: "XX hrs",
  },
  {
    Day: "Friday",
    Date: "## XXX ####",
    Clockin1: "##:## AM",
    Clockout1: "##:## AM",
    Clockin2: "##:## AM",
    Clockout2: "##:## AM",
    Clockin3: "##:## AM",
    Clockout3: "##:## AM",
    Project: "XXXXXXXXXXXXXX",
    Regular: "XX hrs",
    Overtime: "XX hrs",
  },
  {
    Day: "Saturday",
    Date: "## XXX ####",
    Clockin1: "##:## AM",
    Clockout1: "##:## AM",
    Clockin2: "##:## AM",
    Clockout2: "##:## AM",
    Clockin3: "##:## AM",
    Clockout3: "##:## AM",
    Project: "XXXXXXXXXXXXXX",
    Regular: "XX hrs",
    Overtime: "XX hrs",
  },
  {
    Day: "Sunday",
    Date: "## XXX ####",
    Clockin1: "##:## AM",
    Clockout1: "##:## AM",
    Clockin2: "##:## AM",
    Clockout2: "##:## AM",
    Clockin3: "##:## AM",
    Clockout3: "##:## AM",
    Project: "XXXXXXXXXXXXXX",
    Regular: "XX hrs",
    Overtime: "XX hrs",
  },
];

// Duplicate of the above data
const data1 = [
  {
    Day: "Monday",
    Date: "## XXX ####",
    Clockin1: "##:## AM",
    Clockout1: "##:## AM",
    Clockin2: "##:## AM",
    Clockout2: "##:## AM",
    Clockin3: "##:## AM",
    Clockout3: "##:## AM",
    Project: "XXXXXXXXXXXXXX",
    Regular: "XX hrs",
    Overtime: "XX hrs",
  },
  {
    Day: "Tuesday",
    Date: "## XXX ####",
    Clockin1: "##:## AM",
    Clockout1: "##:## AM",
    Clockin2: "##:## AM",
    Clockout2: "##:## AM",
    Clockin3: "##:## AM",
    Clockout3: "##:## AM",
    Project: "XXXXXXXXXXXXXX",
    Regular: "XX hrs",
    Overtime: "XX hrs",
  },
  {
    Day: "Wednesday",
    Date: "## XXX ####",
    Clockin1: "##:## AM",
    Clockout1: "##:## AM",
    Clockin2: "##:## AM",
    Clockout2: "##:## AM",
    Clockin3: "##:## AM",
    Clockout3: "##:## AM",
    Project: "XXXXXXXXXXXXXX",
    Regular: "XX hrs",
    Overtime: "XX hrs",
  },
  {
    Day: "Thursday",
    Date: "## XXX ####",
    Clockin1: "##:## AM",
    Clockout1: "##:## AM",
    Clockin2: "##:## AM",
    Clockout2: "##:## AM",
    Clockin3: "##:## AM",
    Clockout3: "##:## AM",
    Project: "XXXXXXXXXXXXXX",
    Regular: "XX hrs",
    Overtime: "XX hrs",
  },
  {
    Day: "Friday",
    Date: "## XXX ####",
    Clockin1: "##:## AM",
    Clockout1: "##:## AM",
    Clockin2: "##:## AM",
    Clockout2: "##:## AM",
    Clockin3: "##:## AM",
    Clockout3: "##:## AM",
    Project: "XXXXXXXXXXXXXX",
    Regular: "XX hrs",
    Overtime: "XX hrs",
  },
  {
    Day: "Saturday",
    Date: "## XXX ####",
    Clockin1: "##:## AM",
    Clockout1: "##:## AM",
    Clockin2: "##:## AM",
    Clockout2: "##:## AM",
    Clockin3: "##:## AM",
    Clockout3: "##:## AM",
    Project: "XXXXXXXXXXXXXX",
    Regular: "XX hrs",
    Overtime: "XX hrs",
  },
  {
    Day: "Sunday",
    Date: "## XXX ####",
    Clockin1: "##:## AM",
    Clockout1: "##:## AM",
    Clockin2: "##:## AM",
    Clockout2: "##:## AM",
    Clockin3: "##:## AM",
    Clockout3: "##:## AM",
    Project: "XXXXXXXXXXXXXX",
    Regular: "XX hrs",
    Overtime: "XX hrs",
  },
];

// Pay period data, likely intended for summary information
const Paydata = [{ PeriodRegular: "XXX", PeriodOvertime: "XXX" }];

// Weekly total hours, for summarizing at the end of a week
const WeekTotal = [{ Regular: "XXX", Overtime: "XXX" }];

// Main component function
const EditableTimeSheet = ({ children, editable = true }) => (
  <td contentEditable={editable}>{children}</td>
);

function TimeSheet({ editable = false }) {
  return (
    <div className="App">
      {/* Timesheet table section */}
      <section className="Timesheet-Table">
        <table>
          {/* Table headers */}
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
          {/* Mapping data to table rows */}
          {data.map((val, key) => {
            return (
              <tr key={key}>
                {/* Displaying each piece of data in its respective column */}
                <td>{val.Day}</td>
                <td>{val.Date}</td> 
                <EditableTimeSheet editable={editable}>
                  {val.Clockin1}
                </EditableTimeSheet>
                <EditableTimeSheet editable={editable}>
                  {val.Clockout1}
                </EditableTimeSheet>
                <td></td>
                <EditableTimeSheet editable={editable}>
                  {val.Clockin2}
                </EditableTimeSheet>
                <EditableTimeSheet editable={editable}>
                  {val.Clockout2}
                </EditableTimeSheet>
                <td></td>
                <EditableTimeSheet editable={editable}>
                  {val.Clockin3}
                </EditableTimeSheet>
                <EditableTimeSheet editable={editable}>
                  {val.Clockout3}
                </EditableTimeSheet>
                <td></td>
                <EditableTimeSheet editable={editable}>
                  {val.Project}
                </EditableTimeSheet>
                <EditableTimeSheet editable={editable}>
                  {val.Regular}
                </EditableTimeSheet>
                <EditableTimeSheet editable={editable}>
                  {val.Overtime}
                </EditableTimeSheet>
              </tr>
            );
          })}
        </table>
      </section>

      {/* Weekly total hours section */}
      <section className="Timesheet-TotalHours">
        <table>
          {/* Headers for the total hours table */}
          <tr>
            <th></th>
            <th>Regular Hours</th>
            <th>Overtime Hours</th>
          </tr>
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
        </table>
      </section>

      {/* Duplicate timesheet table section */}
      <section className="Timesheet-Table">
        <table>
          {/* Similar structure to the first timesheet table */}
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
          {data1.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.Day}</td>
                 <td>{val.Date}</td> 
                <EditableTimeSheet editable={editable}>
                  {val.Clockin1}
                </EditableTimeSheet>
                <EditableTimeSheet editable={editable}>
                  {val.Clockout1}
                </EditableTimeSheet>
                <td></td>
                <EditableTimeSheet editable={editable}>
                  {val.Clockin2}
                </EditableTimeSheet>
                <EditableTimeSheet editable={editable}>
                  {val.Clockout2}
                </EditableTimeSheet>
                <td></td>
                <EditableTimeSheet editable={editable}>
                  {val.Clockin3}
                </EditableTimeSheet>
                <EditableTimeSheet editable={editable}>
                  {val.Clockout3}
                </EditableTimeSheet>
                <td></td>
                <EditableTimeSheet editable={editable}>
                  {val.Project}
                </EditableTimeSheet>
                <EditableTimeSheet editable={editable}>
                  {val.Regular}
                </EditableTimeSheet>
                <EditableTimeSheet editable={editable}>
                  {val.Overtime}
                </EditableTimeSheet>
              </tr>
            );
          })}
        </table>
      </section>

      {/* Weekly total hours section */}
      <section className="Timesheet-TotalHours">
        <table>
          {/* Headers for the total hours table */}
          <tr>
            <th></th>
            <th>Regular Hours</th>
            <th>Overtime Hours</th>
          </tr>
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
        </table>
      </section>

      {/* Pay period summary section */}
      <section className="Timesheet-PayPeriod">
        <table>
          {/* Headers for the pay period summary table */}
          <tr>
            <th></th>
            <th>Regular Hours</th>
            <th>Overtime Hours</th>
          </tr>
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
        </table>
      </section>
    </div>
  );
}

export default TimeSheet;
