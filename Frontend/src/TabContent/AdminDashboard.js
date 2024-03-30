import React from "react";
import AdminTable from "../Componets/AdminTable.js";

const AdminDashboard = ({ navigateToTimesheetEdit }) => {
  // Define the handleWeekChange function

  return (
    <div> 
      <AdminTable navigateToTimesheetEdit={navigateToTimesheetEdit} />
      {/* Other content for Personal Timesheet can go here */}
    </div>
  );
};

export default AdminDashboard;
