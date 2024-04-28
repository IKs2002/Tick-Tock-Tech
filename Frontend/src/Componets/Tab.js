import React from "react";
import "./Tabs.css"; // Import stylesheet for styling tab components
import { Link } from "react-router-dom"; // Import Link component from react-router-dom for navigation

// Defines a functional component "Tab" that represents an individual tab in a tabbed interface
// Accepts properties for navigation path, label, active status, click handler, and selectability
const Tab = ({ path, label, isActive, onClick, selectable }) => {
  // Conditional rendering based on the 'selectable' prop
  if (!selectable) {
    // Render a non-navigable tab that can be clicked to perform an action defined in `onClick`
    return (
      <div className={`tab ${isActive ? "active" : ""}`} onClick={onClick}>
        {label} {/* Display the label passed as a prop */}
      </div>
    );
  }

  // Render a navigable tab wrapped in a Link component when 'selectable' is true
  return (
    <Link to={path} style={{ color: "black", textDecoration: "none" }}>
      {/* Link component used for navigation with styles to reset text decoration and color */}
      <div className={`tab ${isActive ? "active" : ""}`} onClick={onClick}>
        {label} {/* Display the label */}
      </div>
    </Link>
  );
};

export default Tab; // Export the Tab component for use in other parts of the application
