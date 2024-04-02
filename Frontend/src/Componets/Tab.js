import React from "react";
import "./Tabs.css";
import { Link } from "react-router-dom";

// Tab component definition
// This component represents an individual tab, which can be active or inactive based on the `isActive` prop.
// It displays a label and triggers an `onClick` event handler when clicked.
const Tab = ({ path, label, isActive, onClick, selectable }) => {
  if (!selectable) {
    return (
      <div className={`tab ${isActive ? "active" : ""}`} onClick={onClick}>
        {label}
      </div>
    );
  }

  return (
    <Link to={path} style={{ color: "black", textDecoration: "none" }}>
      <div className={`tab ${isActive ? "active" : ""}`} onClick={onClick}>
        {label}
      </div>
    </Link>
  );
};

export default Tab;
