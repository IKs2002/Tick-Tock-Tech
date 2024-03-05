import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/LoginPage";
import DefaultPage from "./Pages/DefaultPage";
import PasswordRecovery from "./Pages/PasswordRecoveryPage";
import PersonalTimeSheet from "./TabContent/PersonalTimeSheet";
import AdminDashboard from "./TabContent/AdminDashboard";
import TimesheetEdit from "./TabContent/TimesheetEditing";
import TimesheetViewing from "./TabContent/TimesheetViewing";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/PasswordRecovery" element={<PasswordRecovery />} />
      <Route path="/DefaultPage/*" element={<DefaultPage />}>
        <Route path="AdminDashboard" element={<AdminDashboard />} />
        <Route path="PersonalTimeSheet" element={<PersonalTimeSheet />} />
        <Route path="TimesheetEdit" element={<TimesheetEdit />} />
        <Route path="TimesheetViewing" element={<TimesheetViewing />} />
      </Route>
    </Routes>
  );
};

export default App;