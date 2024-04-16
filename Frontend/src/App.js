import React, { useState, useEffect } from "react";
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

  const encryptData = (data) => {
    // Convert data to string
    const dataString = JSON.stringify(data);
    // Encrypt the data using Web Crypto API or other encryption mechanism
    // For demonstration, we'll just encode the string
    return btoa(dataString);
  };
  
  const decryptData = (encryptedData) => {
    try {
      // Decode the data using Web Crypto API or other decryption mechanism
      // For demonstration, we'll just decode the string
      const decryptedString = atob(encryptedData);
      // Parse the decrypted string to JSON
      return JSON.parse(decryptedString);
    } catch (error) {
      console.error("Error decrypting data:", error);
      return null;
    }
  };
  

  // State to hold user properties
  const [user, setUser] = useState(null);

  // Check for user data in local storage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      // Decrypt the stored user data
      const decryptedUser = decryptData(storedUser);
      setUser(decryptedUser);
    }
  }, []);

  // Function to set user properties after login
  const handleLogin = (userData) => {
    setUser(userData);
    // Encrypt and store user data in local storage
    const encryptedUser = encryptData(userData);
    localStorage.setItem('user', encryptedUser);
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
