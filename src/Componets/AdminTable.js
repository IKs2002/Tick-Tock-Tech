import React, { useState } from "react";
import "./AdminTable.css";
import AddEmployeeForm from "./AddEmployeeForm";
import DeleteButton from "../Photos/AdminDashboardButtons/DeleteButton.png";

// Defines the AdminTable component responsible for displaying and managing employees in the admin dashboard
const AdminTable = () => {
  // State to store and manage the list of employees
  const [employees, setEmployees] = useState([
    { id: 1, name: "John Smith", status: "Clocked Out", locked: false },
    { id: 2, name: "Jane Doe", status: "Clocked In", locked: false },
    { id: 3, name: "Emily Johnson", status: "Lunch", locked: false },
    { id: 4, name: "Mark Rodgers", status: "Break", locked: false },
  ]);

  // State to manage the search query for filtering employees
  const [searchQuery, setSearchQuery] = useState("");

  // Object mapping employee statuses to their corresponding background and text colors
  const statusColors = {
    "Clocked Out": "#FEEFF0", // red
    "Clocked In": "#EEF8F2", // green
    Break: "#E4F1F9", // blue
    Lunch: "#FFF8ED", // yellow
  };

  const statusColorsText = {
    "Clocked Out": "#ED5E61", // red
    "Clocked In": "#59B77A", // green
    Break: "#7EB6FF", // blue
    Lunch: "#FFA114", // yellow
  };

  // Function to toggle the lock status of an employee
  const toggleLock = (id) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id === id ? { ...emp, locked: !emp.locked } : emp
      )
    );
  };

  // Function to lock or unlock all employees based on their current lock status
  const handleLockAll = () => {
    const anyUnlocked = employees.some((emp) => !emp.locked);
    const action = anyUnlocked ? "lock" : "unlock";
    const confirmed = window.confirm(
      `Are you sure you want to ${action} all employees?`
    );

    if (confirmed) {
      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) => ({ ...emp, locked: anyUnlocked }))
      );
    }
  };

  // Function to delete an employee after confirmation
  const deleteEmployee = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (confirmed) {
      setEmployees(employees.filter((emp) => emp.id !== id));
    }
  };

  // Function to toggle the visibility of a popup associated with an employee
  const myFunction = (empId) => {
    var popup = document.getElementById(`myPopup-${empId}`);
    if (popup) {
      popup.classList.toggle("show");
    }
  };

  // Renders the rows of the employee table, filtering based on the search query
  const renderRows = () => {
    return employees
      .filter((emp) =>
        emp.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map((emp) => (
        <tr key={emp.id}>
          {/* Employee name and popup trigger */}
          <td
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "-0.745%",
            }}
          >
            <div className="employee-name">{emp.name}</div>
            <div
              className="popup"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering other onClick events
                myFunction(emp.id);
              }}
            ></div>
          </td>
          {/* Employee status with dynamic coloring */}
          <td>
            <div
              className="employee-status-select"
              style={{
                "--statusColors": statusColors[emp.status],
                "--statusColorsText": statusColorsText[emp.status],
              }}
            >
              {emp.status}
            </div>
          </td>
          {/* Lock/Unlock button */}
          <td>
            <button
              className="btn btn-link"
              onClick={() => toggleLock(emp.id)}
              style={{
                color: emp.locked ? "#ED5E61" : "#1C2D5A",
                border: "0px",
                width: "6vw",
                height: "4.3vh",
                fontSize: "1.2vw",
                fontWeight: "bold",
                textAlign: "center",
                marginLeft: "12%",
                background: "none",
              }}
            >
              {emp.locked ? "Unlock" : "Lock"} {/*Changes button text based on the lock status*/}
            </button>
          </td>
          <td>
            {/* Delete Button */}
            <button
              className="btn btn-link delete-btn"
              onClick={(e) => {
              deleteEmployee(emp.id); 
              }}
            >
              <img
                src={DeleteButton}
                alt="not found"
                className="DeleteButton"
              />
            </button>
          </td>
        </tr>
      ));
  };

  // Add new employees
  const addEmployee = (newEmployee) => {
    setEmployees((prevEmployees) => [
      ...prevEmployees,
      {
        id: prevEmployees.length + 1,
        name: newEmployee.name,
        status: "Clocked Out",
        locked: false,
      },
    ]);
  };
// Main render for admintable component
  return (
    <div className="AdminDashboard_ParentBorder">
      <div className="AdminDashboardTable">
        {/*Search input for adding a new employee */}
        <div className="AdminDashboardInputs">
          <AddEmployeeForm addEmployee={addEmployee} />
          {/* Search table */}
          <input
            className="AdminDashboard_SearchEmployee"
            type="text"
            placeholder="  Search table"  /* placeholder text for the search*/
            value={searchQuery} /*  Binds the input value to the searchQuery state*/
            onChange={(e) => setSearchQuery(e.target.value)} /* Updates the searchQuery state on input change*/
          />
        </div>
        {/* Table for displaying employees */}
        <table className="table mt-3">
          <thead>
            <tr>
              <th>Employee Name</th> {/*Column header for employee names */ }
              <th>Status</th> {/* Column header for employee status*/}
              <th>Access</th> {/* Column header for lock/unlock action*/}
              <th>Manage</th> {/* Column header for delete action*/}
            </tr>
          </thead>
          <tbody>{renderRows()}</tbody> {/* Calls renderRows to populate the table body with employee data*/}
          <tfoot>{/* Footer */}</tfoot>
        </table>

        {/* Bottom buttons */}
        <div className="AdminDashboard_BottomButtons">
         {/* Button to lock or unlock all employees */}
          <button
            onClick={handleLockAll}
            className="AdminDashboard_LockAllButton"
          >
            {employees.every((emp) => emp.locked) ? "Unlock All" : "Lock All"} {/* Changes button text based on the lock status of all employees */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminTable; // export admintable component

//last updated 2/25 -Sierra



