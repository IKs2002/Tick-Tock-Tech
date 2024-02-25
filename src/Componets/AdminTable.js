import React, { useState } from "react";
import "./AdminTable.css";


const AdminTable = () => {
  // state of employees
  const [employees, setEmployees] = useState([
    { id: 1, name: "John Smith", status: "Clocked Out", locked: false },
    { id: 2, name: "Jane Doe", status: "Clocked Out", locked: false },
    { id: 3, name: "", status: "Clocked Out", locked: false },
    { id: 4, name: "", status: "Clocked Out", locked: false },
  ]);

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

  // toggle employee lock status
  const toggleLock = (id) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id === id ? { ...emp, locked: !emp.locked } : emp
      )
    );
  };

  // changes in employee name
  const handleNameChange = (id, newName) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id === id ? { ...emp, name: newName } : emp
      )
    );
  };

  // changes in employee status
  const handleStatusChange = (id, newStatus) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id === id ? { ...emp, status: newStatus } : emp
      )
    );
  };

  // For "Lock All"/ "Unlock All" button
  const handleLockAll = () => {
    const anyUnlocked = employees.some(emp => !emp.locked);
    const action = anyUnlocked ? "lock" : "unlock";
    const confirmed = window.confirm(`Are you sure you want to ${action} all employees?`);
    
    if (confirmed) {
      setEmployees(prevEmployees =>
        prevEmployees.map(emp => ({ ...emp, locked: anyUnlocked }))
      );
    }
  };

  // popup toggle function
  const myFunction = (empId) => {
    var popup = document.getElementById(`myPopup-${empId}`);
    if (popup) {
      popup.classList.toggle("show");
    }
  };
  
  // Render rows for employees
  const renderRows = () => {
    return employees.map((emp) => (
      <tr key={emp.id}>
        <td style={{ display: "flex", alignItems: "center" }}>
          <div className="employee-input-container">
            <input
              type="text"
              placeholder="Employee Name"
              value={emp.name}
              onChange={(e) => handleNameChange(emp.id, e.target.value)}
              className="employee-name-input"
            />
          </div>
          <div className="popup" onClick={() => myFunction(emp.id)}>
            <button
              className="btn btn-link delete-btn"
              onClick={() => handleConfirm(emp.id, emp.name)}
            >
              🗑️
            </button>
          </div>
        </td>
        <td>
          <select
            value={emp.status}
            onChange={(e) => handleStatusChange(emp.id, e.target.value)}
            style={{
              backgroundColor: statusColors[emp.status],
              color: statusColorsText[emp.status],
              outline: "none",
              width: "8vw",
              height: "4.3vh",
              border: "0",
              fontSize: "1.1vw",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            <option
              value="Clocked Out"
              style={{ backgroundColor: statusColors["Clocked Out"], color: statusColorsText["Clocked Out"], fontWeight: "bold"}}
            >
              Clocked Out 
            </option>
            <option
              value="Clocked In"
              style={{ backgroundColor: statusColors["Clocked In"], color: statusColorsText["Clocked In"], fontWeight: "bold"}}
            >
              Clocked In 
            </option>
            <option
              value="Break"
              style={{ backgroundColor: statusColors["Break"], color: statusColorsText["Break"], fontWeight: "bold"}}
            >
              Break 
            </option>
            <option
              value="Lunch"
              style={{ backgroundColor: statusColors["Lunch"], color: statusColorsText["Lunch"], fontWeight: "bold"}}
            >
              Lunch 
            </option>
          </select>
        </td>
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
            }}
          >
            {emp.locked ? "Unlock" : "Lock"}
          </button>
        </td>
      </tr>
    ));
  };
  
  const handleConfirm = (id, name) => {
    const confirmed = window.confirm(`Are you sure you want to delete ${name}?`);
    if (confirmed) {
      // handle confirmation
      console.log("Confirmed for employee ID:", id);
    }
  };

  // Add new employees
  const addEmployee = () => {
    setEmployees((prevEmployees) => [
      ...prevEmployees,
      {
        id: prevEmployees.length + 1,
        name: "",
        status: "Clocked Out",
        locked: false,
      },
    ]);
  };

  return (
    <div className="AdminDashboard_ParentBorder">
      <div className="AdminDashboardTable">
        {/* input for adding a new employee */}
        <div classname="AdminDashboardInputs">
          <input
            className="AdminDashboard_EmployeeNew"
            type="text"
            placeholder="  Enter New Employee"
            onKeyPress={(e) => {
              // calls addEmployee function when you hit enter
              if (e.key === "Enter") {
                addEmployee();
              }
            }}
          />
          {/* Search table */}
          <input
            className="AdminDashboard_EmployeeAdd"
            type="text"
            placeholder="  Search table"
          />
        </div>
        <table className="table mt-3">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Status</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>{renderRows()}</tbody>
          <tfoot>{/* Footer */}</tfoot>
        </table>

        {/* Bottom buttons */}
        <div className="AdminDashboard_BottomButtons">
          <button
            onClick={handleLockAll}
            className="AdminDashboard_LockAllButton"
          >
            {employees.every(emp => emp.locked) ? "Unlock All" : "Lock All"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminTable;

//last updated 2/24 -Sierra