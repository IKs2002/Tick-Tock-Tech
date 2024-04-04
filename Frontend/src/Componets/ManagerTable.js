import React, { useState, useEffect } from "react";
import "./ManagerTable.css";


const ManagerTable = ({ navigateToTimesheetViewing }) => {

  const navigateToEmployeeViewing = (empId, empName) => {
    console.log("Employee ID:", empId); // Log empId to check if it's undefined
    console.log("Employee Name:", empName); // Log empName for debugging
    navigateToTimesheetViewing(empId, empName);
  };



  // State to store and manage the list of employees
  const [employees, setEmployees] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const statusColors = {
    "Clocked Out": "#FEEFF0", // red
    "Clocked In": "#EEF8F2", // green
    Break: "#E4F1F9", // blue
    Meal: "#FFF8ED", // yellow
  };

  const statusColorsText = {
    "Clocked Out": "#ED5E61", // red
    "Clocked In": "#59B77A", // green
    Break: "#7EB6FF", // blue
    Meal: "#FFA114", // yellow
  };

  const fetchAllEmployees = () => {
    fetch("http://localhost:5000/api/userData/getAll")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const formattedEmployees = data.map((user) => ({
          id: user.id,
          name: user.name,
          status: user.status || "Clocked Out",
          locked: user.locked,
        }));
        console.log("Response1", formattedEmployees);
        setEmployees(formattedEmployees);
      })
      .catch((error) => console.error("Error:", error));
  };
  
  
    useEffect(() => {
      fetchAllEmployees();
    }, []);

  const renderRows = () => {
    return employees
      .filter((emp) =>
        emp.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map((emp) => (
        <tr key={emp.id}>
          <td  onClick={() => {
              console.log("Clicked on employee:", emp.id); // Log emp.id before navigating
              navigateToEmployeeViewing(emp.id, emp.name);
            }} className="ManagerDashboard_clickable-cell" ><div className="employee-name2">{emp.name}</div></td>
          <td>
            <div
              className="manager-employee-status-select"
              style={{
                "--statusColors": statusColors[emp.status],
                "--statusColorsText": statusColorsText[emp.status],
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
      <div className="ManagerDashboardTable">
        <div className="ManagerDashboardInputs">
          {/* No add employee*/}
          <input
            className="ManagerDashboard_SearchEmployee"
            type="text"
            placeholder="  Search table"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <table className="table mt-3">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{renderRows()}</tbody>
          <tfoot></tfoot>
        </table>
        {/* Bottom buttons (removed lock/unlock and delete features) */}
      </div>
    </div>
  );
};

export default ManagerTable;