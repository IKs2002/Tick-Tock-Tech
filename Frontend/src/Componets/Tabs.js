import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Tabs.css";
import Tab from "./Tab";

const Tabs = ({ prop, role }) => {
  const location = useLocation();

  // Define tabs based on user's role
  const tabs = [
    { label: "Personal Timesheet", path: "PersonalTimeSheet" },
    ...(role === "manager" ? [{ label: "Manager Dashboard", path: "ManagerDashboard" }] : []),
    ...(role === "admin" ? [{ label: "Admin Dashboard", path: "AdminDashboard" }] : []),
    { label: "Timesheet Viewing", path: "None" },
    { label: "Timesheet Editing", path: "None" },
  ];

  // Initialize activeTab from localStorage if available
  const [activeTab, setActiveTab] = useState(
    prop === "View" ? tabs.findIndex((tab) => tab.label === "Timesheet Viewing") : parseInt(localStorage.getItem("activeTab")) || 0
  );

  useEffect(() => {
    // Set tab based on prop changes
    const tabIndices = { Edit: 3, View: 4 };
    const newActiveTab = prop in tabIndices ? tabIndices[prop] : activeTab;
    setActiveTab(newActiveTab);
    localStorage.setItem("activeTab", newActiveTab); // Save to localStorage
  }, [prop]);

  useEffect(() => {
    // Listen to changes in activeTab and update localStorage
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  const handleTabClick = (index) => {
    if (index !== 4) {
      setActiveTab(index);
    }
  };

  return (
    <div className="tabs-container">
      <div className="tabs">
        {tabs.map((tab, index) => {
          if (
            (tab.label === "Timesheet Editing" && prop !== "Edit") ||
            (tab.label === "Timesheet Viewing" && prop !== "View")
          ) {
            return null;
          } else {
            return (
              <Tab
                key={index}
                className={location.pathname.includes(tab.path) ? "active" : ""}
                label={tab.label}
                path={tab.path !== "None" ? `/Home/${tab.path}` : undefined}
                onClick={() => handleTabClick(index)}
                isActive={index === activeTab || (prop === "View" && tab.label === "Timesheet Viewing")} 
                selectable={tab.path !== "None"}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default Tabs;