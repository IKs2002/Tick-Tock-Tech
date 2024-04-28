import React, { useState, useEffect } from "react";
import "./ManagerTable.css"; // Import the CSS styles specifically for ManagerTable

const ManagerTable = ({ navigateToTimesheetViewing }) => {
  // Function to navigate to the timesheet viewing for a specific employee
  const navigateToEmployeeViewing = (empId, empName) => {
    console.log("Employee ID:", empId); // Log employee ID for debugging
    console.log("Employee Name:", empName); // Log employee name for further use or debugging
    navigateToTimesheetViewing(empId, empName);
  };

  // State for storing and managing the list of employees
  const [employees, setEmployees] = useState([]);

  // State for storing the current search query used to filter employees
  const [searchQuery, setSearchQuery] = useState("");

  // Object for storing color codes based on employee status
  const statusColors = {
    "Clocked Out": "#FEEFF0", // Light red background for "Clocked Out" status
    "Clocked In": "#EEF8F2", // Light green background for "Clocked In" status
    Break: "#E4F1F9", // Light blue background for "Break" status
    Meal: "#FFF8ED", // Light yellow background for "Meal" status
  };

  // Corresponding text colors for the status colors
  const statusColorsText = {
    "Clocked Out": "#ED5E61", // Red text for "Clocked Out" status
    "Clocked In": "#59B77A", // Green text for "Clocked In" status
    Break: "#7EB6FF", // Blue text for "Break" status
    Meal: "#FFA114", // Yellow text for "Meal" status
  };

  // Function to fetch all employees from the backend
  const fetchAllEmployees = () => {
    fetch("http://localhost:5000/api/userData/getAll")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok"); // Handle HTTP error responses
        }
        return response.json(); // Parse JSON response
      })
      .then((data) => {
        const formattedEmployees = data.map((user) => ({
          id: user.id,
          name: user.name,
          status: user.status || "Clocked Out", // Default status if not provided
          locked: user.locked, // Locked status of the employee
        }));
        console.log("Response1", formattedEmployees); // Log formatted data for debugging
        setEmployees(formattedEmployees); // Update state with the new employees data
      })
      .catch((error) => console.error("Error:", error)); // Catch and log errors
  };

  // useEffect to fetch employees when the component mounts
  useEffect(() => {
    fetchAllEmployees();
  }, []);

  // Function to render rows of the employee table, filtering based on the search query
  const renderRows = () => {
    return employees
      .filter((emp) =>
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) // Filter employees by search query
      )
      .map((emp) => (
        // Render a table row for each employee
        <tr key={emp.id}>
          {/* Employee name cell, clickable to view more details */}
          <td onClick={() => {
              console.log("Clicked on employee:", emp.id); // Log click for debugging
              navigateToEmployeeViewing(emp.id, emp.name); // Navigate to employee details
            }} className="ManagerDashboard_clickable-cell">
            <div className="employee-name2">{emp.name}</div>
          </td>
          {/* Employee status cell with dynamic background and text color based on status */}
          <td>
            <div
              className="manager-employee-status-select"
              style={{
                "--statusColors": statusColors[emp.status], // Dynamic background color based on status
                "--statusColorsText": statusColorsText[emp.status], // Dynamic text color based on status
              }}
            >
              {emp.status}
            </div>
          </td>
        </tr>
      ));
  };

  return (
    <div className="ManagerDashboard_ParentBorder">
      {/* Main container for the Manager Dashboard Table */}
      <div className="ManagerDashboardTable">
        {/* Container for input elements like search fields */}
        <div className="ManagerDashboardInputs">
          {/* Search input to filter the table */}
          <input
            className="ManagerDashboard_SearchEmployee"
            type="text"
            placeholder="  Search table" // Placeholder text to guide users
            value={searchQuery} // Controlled input value linked to the searchQuery state
            onChange={(e) => setSearchQuery(e.target.value)} // Update state upon input change
          />
        </div>
        {/* Table structure for displaying employee data */}
        <table className="table mt-3">
          <thead>
            {/* Table header with column titles */}
            <tr>
              <th>Employee Name</th> {/* Column title for employee names */}
              <th>Status</th> {/* Column title for employee status */}
            </tr>
          </thead>
          <tbody>
            {renderRows()} {/* Call to function that renders each row of the table based on employee data */}
          </tbody>
          <tfoot>
            {/* Footer of the table (currently empty but can be used for pagination or summary info) */}
          </tfoot>
        </table>
        {/* Placeholder for potential bottom buttons or additional UI elements; specific features like lock/unlock and delete have been removed */}
      </div>
    </div>
    );
};
  export default ManagerTable; // Export the ManagerTable component for use in other parts of the application
  