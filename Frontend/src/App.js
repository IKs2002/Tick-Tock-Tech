// Import the necessary dependencies
import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Pages/LoginPage";
import DefaultPage from "./Pages/DefaultPage";
import PasswordRecovery from "./Pages/PasswordRecoveryPage";
import PersonalTimeSheet from "./TabContent/PersonalTimeSheet";
import AdminDashboard from "./TabContent/AdminDashboard";
import TimesheetEdit from "./TabContent/TimesheetEditing";
import TimesheetViewing from "./TabContent/TimesheetViewing";
import ManagerDashboard from "./TabContent/ManagerDashboard";

const App = () => {
  const navigate = useNavigate();

  // State to hold user properties
  const [user, setUser] = useState(null);

  // Function to set user properties after login
  const handleLogin = (userData) => {
    setUser(userData);
    navigate("/Home/PersonalTimeSheet"); // Redirect to Home after login
  };

  // Function to navigate to the TimesheetEdit page with employee ID
  const navigateToTimesheetEdit = (employeeId, employeeName) => {
    navigate(`/Home/TimesheetEdit?email=${employeeId}&name=${employeeName}`);
  };

  const navigateToTimesheetViewing = (employeeId, employeeName) => {
    navigate(`/Home/TimesheetViewing?email=${employeeId}&name=${employeeName}`);
  };

  return (
    <Routes>
      {/* Render different routes based on the user's role */}
      {user && (
        <Route path="/Home/*" element={<DefaultPage user={user} />}>
          <Route path="PersonalTimeSheet" element={<PersonalTimeSheet userName={user.name} userEmail={user.email} />} />
          {user.role === "admin" && (
            <Route path="AdminDashboard" element={<AdminDashboard navigateToTimesheetEdit={navigateToTimesheetEdit} />} />
          )}
          {user.role === "manager" && (
            <Route path="ManagerDashboard" element={<ManagerDashboard navigateToTimesheetViewing={navigateToTimesheetViewing} />} />
          )}
          <Route path={"TimesheetEdit"} element={<TimesheetEdit />} />
          <Route path="TimesheetViewing" element={<TimesheetViewing />} />
        </Route>
      )}
      <Route
        path="/"
        element={<Login handleLogin={handleLogin} />}
      />
      <Route path="/PasswordRecovery" element={<PasswordRecovery />} />
    </Routes>
  );
};

export default App;
