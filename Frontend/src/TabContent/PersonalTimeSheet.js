import React, { useRef, useState } from "react";
import SaveAsPDFButton from "../Componets/SaveAsPDFButton";
import WeekPicker from "../Componets/WeekPicker.js";
import TimeSheet from "../Componets/TimeSheet.js";
import { startOfWeek, addDays, format as formatDate } from "date-fns";
import moment from "moment";

const PersonalTimeSheet = () => {
  let data;
  const initialWeekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const initialWeekEnd = addDays(initialWeekStart, 13);

  const initialFirstWeekStart = moment(initialWeekStart).startOf("day");
  const initialSecondWeekEnd = moment(initialWeekEnd).endOf("day");

  const [firstWeekStart, setFirstWeekStart] = useState(
    initialFirstWeekStart.toDate()
  );
  const [secondWeekEnd, setSecondWeekEnd] = useState(
    initialSecondWeekEnd.toDate()
  );

  // Define the handleWeekChange function
  const handleWeekChange = (weeks) => {
    const newFirstWeekStart = moment(weeks.beginning.firstWeekStart).toDate();
    const newSecondWeekEnd = moment(weeks.ending.secondWeekEnd).toDate();

    setFirstWeekStart(newFirstWeekStart);
    setSecondWeekEnd(newSecondWeekEnd);

    // Implement what should happen when weeks change
    console.log(weeks); // For example, log the new weeks to the console
  };
  const uid = 12345;
  ;
  const fetchTimesheetData = async (uid, firstWeekStart, secondWeekEnd) => {
    const url = `http://localhost:5000/api/timeData/get/uid=${uid}&startDate=${firstWeekStart}&endDate=${secondWeekEnd}`;

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
      data = await response.json();
      return data;
    }
  };

  
  var name = "Employee Name";

  // Format dates before logging or passing them to other components
  const formattedFirstWeekStart = firstWeekStart
    ? formatDate(firstWeekStart, "MM-dd-yy")
    : null;
  const formattedSecondWeekEnd = secondWeekEnd
    ? formatDate(secondWeekEnd, "MM-dd-yy")
    : null;

  let docToPrint = useRef(); // Needs to be in every page for save-as-pdf
  console.log(
    name + " " + formattedFirstWeekStart + " through " + formattedSecondWeekEnd
  );

  data = fetchTimesheetData(uid, formattedFirstWeekStart, formattedSecondWeekEnd);
  console.log(data);
  // ...

  return (
    <div>
      <SaveAsPDFButton
        ref={docToPrint}
        start={formattedFirstWeekStart}
        end={formattedSecondWeekEnd}
        name={name}
      />
      <div ref={docToPrint}>
        <div>
          <WeekPicker onChange={handleWeekChange} />
        </div>

        <div>
          <label className="EmpName">Employee Name</label>
        </div>
        <div>
          <TimeSheet timeData={data} />
        </div>
        {/* Other content for Personal Timesheet can go here */}
      </div>
    </div>
  );
};

export default PersonalTimeSheet;
