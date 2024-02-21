import React, { useRef } from "react";

import SaveAsPDFButton from "../Componets/SaveAsPDFButton"
import WeekPicker from "../Componets/WeekPicker.js";
import TimeSheet from "../Componets/TimeSheet.js";


const PersonalTimeSheet = () => {
  // Define the handleWeekChange function
  const handleWeekChange = (weeks) => {
    // Implement what should happen when weeks change
    console.log(weeks); // For example, log the new weeks to the console
  };

  let docToPrint = useRef(); // Needs to be in every page for save-as-pdf
  return (
    
      <div >
      <div className="center-container">
        <WeekPicker onChange={handleWeekChange} />

      <SaveAsPDFButton ref={docToPrint} />
      
    </div >
    <div ref={docToPrint} >
        <TimeSheet />
        {/* Other content for Personal Timesheet can go here */}
        </div>
      </div>
    
  );
};

export default PersonalTimeSheet;
