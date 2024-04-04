import React from "react";
import ManagerTable from "../Componets/ManagerTable.js";

const ManagerDashboard= ({navigateToTimesheetViewing}) => {
  // Define the handleWeekChange function

  return (
    <div> 
      <ManagerTable navigateToTimesheetViewing = {navigateToTimesheetViewing}/>
      {/* */}
    </div>
  );
};

export default ManagerDashboard;