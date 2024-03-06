import React from "react";

// Tab component definition
// This component represents an individual tab, which can be active or inactive based on the `isActive` prop.
// It displays a label and triggers an `onClick` event handler when clicked.
const Tab = ({ label, onClick, isActive }) => (
  // The `div` element for the tab
  // The `className` dynamically includes 'active' depending on the `isActive` prop to style the active tab differently.
  // The `onClick` prop is a function passed from the parent component that handles the tab's click event.
  <div className={`tab ${isActive ? "active" : ""}`} onClick={onClick}>
    {label} {/* The label prop is displayed inside the tab. This is the text that appears on the tab. */}
  </div>
);

export default Tab; // Exports the Tab component for use in other parts of the application
