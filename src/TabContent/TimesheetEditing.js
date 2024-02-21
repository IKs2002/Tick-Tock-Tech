import React from "react";
import "./TimesheetEdit.css";
import ProfilePicBlack from "../Photos/HeaderPhotos/ProfilePicBlack.png";
import TimeSheet from "../Componets/TimeSheet.js";
import WeekPicker from "../Componets/WeekPicker.js";

const TimesheetEdit = () => {
  const handleWeekChange = (weeks) => {
    // Implement what should happen when weeks change
    console.log(weeks); // For example, log the new weeks to the console
  };

  return (
    <div>
      <div className="Week-of">
        <div className="center-container">
          <WeekPicker onChange={handleWeekChange} />
        </div>
        <button className="GenericButtons">Save Changes</button>
      </div>
      <div>
        <label class="EmpName">Employee Name</label>
      </div>
      <container class="tableArea">
        <div class="ImgArea">
          <img src={ProfilePicBlack} class="ProfImg" />
        </div>
        <div class="TimesheetArea">
          <TimeSheet editable={true} />
        </div>
      </container>
    </div>
  );
};
export default TimesheetEdit;
