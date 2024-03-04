import React, { useRef, useState, useEffect } from "react";
import SaveAsPDFButton from "../Componets/SaveAsPDFButton";
import WeekPicker from "../Componets/WeekPicker.js";
import TimeSheet from "../Componets/TimeSheet.js";
import { startOfWeek, addWeeks,addDays, format as formatDate } from "date-fns";
import moment from 'moment';

const PersonalTimeSheet = () => {
  const [firstWeekStart, setFirstWeekStart] = useState(null);
  const [secondWeekEnd, setSecondWeekEnd] = useState(null);
  // ...

  // Define the handleWeekChange function
  const handleWeekChange = (weeks) => {
    const newFirstWeekStart = moment(weeks.beginning.firstWeekStart).toDate();
    const newSecondWeekEnd = moment(weeks.ending.secondWeekEnd).toDate();


    setFirstWeekStart(newFirstWeekStart);
    setSecondWeekEnd(newSecondWeekEnd);

    // Implement what should happen when weeks change
    console.log(weeks); // For example, log the new weeks to the console
  };



  const initialWeekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const initialWeekEnd = addDays(initialWeekStart, 13);

  const initialFirstWeekStart = moment(initialWeekStart).startOf('day');
  const initialSecondWeekEnd = moment(initialWeekEnd).endOf('day');

  useEffect(() => {
    setFirstWeekStart(initialFirstWeekStart.toDate());
    setSecondWeekEnd(initialSecondWeekEnd.toDate());
  }, []);

  var name = "Employee Name"

  // Format dates before logging or passing them to other components
  const formattedFirstWeekStart = firstWeekStart ? formatDate(firstWeekStart, 'MM-dd-yy') : null;
  const formattedSecondWeekEnd = secondWeekEnd ? formatDate(secondWeekEnd, 'MM-dd-yy') : null;

  let docToPrint = useRef(); // Needs to be in every page for save-as-pdf
  console.log(name + " " + formattedFirstWeekStart + " through " + formattedSecondWeekEnd);

  // ...

  return (
    <div>
      <SaveAsPDFButton ref={docToPrint} start={formattedFirstWeekStart} end={formattedSecondWeekEnd} name={name} />
      <div ref={docToPrint}>
        <div>
          <WeekPicker onChange={handleWeekChange}/>
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