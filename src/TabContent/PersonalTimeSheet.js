import React, { useRef, useState } from "react";
import SaveAsPDFButton from "../Componets/SaveAsPDFButton";
import WeekPicker from "../Componets/WeekPicker.js";
import TimeSheet from "../Componets/TimeSheet.js";
import { format as formatDate } from "date-fns";
import moment from 'moment';

const PersonalTimeSheet = () => {
  const [firstWeekStart, setFirstWeekStart] = useState(null);
  const [secondWeekEnd, setSecondWeekEnd] = useState(null);
  
  // ...

  // Define the handleWeekChange function
  const handleWeekChange = (weeks) => {
    const newFirstWeekStart = moment(weeks.beginning.firstWeekStart).toDate();
    newFirstWeekStart.setHours(0, 0, 0, 0);
    const newSecondWeekEnd = moment(weeks.ending.secondWeekEnd).toDate();
    newSecondWeekEnd.setHours(0, 0, 0, 0);


    setFirstWeekStart(newFirstWeekStart);
    setSecondWeekEnd(newSecondWeekEnd);

    // Implement what should happen when weeks change
    console.log(weeks); // For example, log the new weeks to the console
  };

  // Format dates before logging or passing them to other components
  const formattedFirstWeekStart = firstWeekStart ? formatDate(firstWeekStart, 'MM-dd-yy') : null;
  const formattedSecondWeekEnd = secondWeekEnd ? formatDate(secondWeekEnd, 'MM-dd-yy') : null;

  let docToPrint = useRef(); // Needs to be in every page for save-as-pdf
  console.log("employee name " + formattedFirstWeekStart + " through " + formattedSecondWeekEnd);

  // ...

  return (
    <div>
      <SaveAsPDFButton ref={docToPrint} start={formattedFirstWeekStart} end={formattedSecondWeekEnd} />
      <div ref={docToPrint}>
        <div>
          <WeekPicker onChange={handleWeekChange} />
        </div>

        <div>
          <label className="EmpName">Employee Name</label>
        </div>
        <div>
          <TimeSheet />
        </div>
        {/* Other content for Personal Timesheet can go here */}
      </div>
    </div>
  );
};

export default PersonalTimeSheet;