import React from "react";
import WeekPicker from "../Componets/WeekPicker.js";
import TimeSheet from "../Componets/TimeSheet.js";
const PersonalTimeSheet = () => {
  // Define the handleWeekChange function
  const handleWeekChange = (weeks) => {
    // Implement what should happen when weeks change
    console.log(weeks); // For example, log the new weeks to the console
  };

  return (
    <div>
      <WeekPicker onChange={handleWeekChange} />
      <TimeSheet />
      {/* Other content for Personal Timesheet can go here */}
    </div>
  );
};

export default PersonalTimeSheet;
