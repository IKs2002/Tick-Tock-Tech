import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Tabs.css";
import Tab from "./Tab";

const Tabs = () => {
  const location = useLocation();
  const tabs = [
    { label: "Personal Timesheet", path: "PersonalTimeSheet" },
    { label: "Manager Dashboard", path: "ManagerDashboard"},
    { label: "Admin Dashboard", path: "AdminDashboard" },
    { label: "Timesheet Viewing", path: "TimesheetViewing" },
    { label: "Timesheet Editing", path: "TimesheetEdit" },
  ];
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="tabs-container">
      <div className="tabs">
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            className={location.pathname.includes(tab.path) ? "active" : ""}
            label={tab.label}
            path={`/Home/${tab.path}`}
            onClick={() => handleTabClick(index)}
            isActive={index === activeTab}
          />
        ))}
      </div>
    </div>
  );
};

export default Tabs;
