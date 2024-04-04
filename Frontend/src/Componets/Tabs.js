import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Tabs.css";
import Tab from "./Tab";

const Tabs = ({ prop }) => {
  const location = useLocation();
  const tabs = [
    { label: "Personal Timesheet", path: "PersonalTimeSheet" },
    { label: "Manager Dashboard", path: "ManagerDashboard" },
    { label: "Admin Dashboard", path: "AdminDashboard" },
    { label: "Timesheet Viewing" },
    { label: "Timesheet Editing" }, // No path for "Timesheet Editing" tab
  ];
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (prop === "Edit") {
      setActiveTab(4);
    } else if (prop === "View") {
      setActiveTab(3);
    }
  }, [prop]);

  const handleTabClick = (index) => {
    if (index !== 4) {
      setActiveTab(index);
    }
  };

  return (
    <div className="tabs-container">
      <div className="tabs">
        {tabs.map((tab, index) =>
          // Only render "Timesheet Editing" tab when prop is 'Edit' and it's not the active tab
          // Only render "Timesheet Viewing" tab when prop is 'Viewing' and it's not the active tab
          (tab.label === "Timesheet Editing" && prop !== "Edit" && index !== activeTab) ||
          (tab.label === "Timesheet Viewing" && prop !== "View" && index !== activeTab) ? null : (
            <Tab
              key={index}
              className={location.pathname.includes(tab.path) ? "active" : ""}
              label={tab.label}
              path={tab.path ? `/Home/${tab.path}` : undefined} // Conditionally set path based on existence
              onClick={
                (tab.label === "Timesheet Editing" && prop === "Edit") ||
                (tab.label === "Timesheet Viewing" && prop === "View")
                  ? undefined
                  : () => handleTabClick(index)
              }
              isActive={index === activeTab}
              selectable={true} // All tabs are selectable
            />
          )
        )}
      </div>
    </div>
  );
};

export default Tabs;
