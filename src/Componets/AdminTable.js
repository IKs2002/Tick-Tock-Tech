import React, { useState } from "react";
import "./AdminTable.css";

const AdminTable = () => {
  // state of employees
  const [employees, setEmployees] = useState([
    { id: 1, name: "", status: "Clocked Out", locked: false },
    { id: 2, name: "", status: "Clocked Out", locked: false },
    { id: 3, name: "", status: "Clocked Out", locked: false },
    { id: 4, name: "", status: "Clocked Out", locked: false },
  ]);

  // State for master checkbox
  const [isAllChecked, setIsAllChecked] = useState(false);

  // Handle master checkbox change
  const handleMasterCheckboxChange = () => {
    setIsAllChecked(!isAllChecked);
    setEmployees(employees.map((emp) => ({ ...emp, checked: !isAllChecked })));
  };

  // Update individual checkbox
  const handleCheckboxChange = (id) => {
    setEmployees(
      employees.map((emp) =>
        emp.id === id ? { ...emp, checked: !emp.checked } : emp
      )
    );
  };

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

  // chnages in employee status
  const handleStatusChange = (id, newStatus) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id === id ? { ...emp, status: newStatus } : emp
      )
    );
  };

  //for delete button
  const handleDeleteSelected = () => {};

  //for lock all button
  const handleLockAll = () => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) => ({ ...emp, locked: true }))
    );
  };

  // rows for employees
  const renderRows = () => {
    return employees.map((emp) => (
      <tr key={emp.id}>
        <td>
          <input
            type="checkbox"
            checked={emp.checked}
            onChange={() => handleCheckboxChange(emp.id)}
          />
        </td>
        <td>
          <input
            type="text"
            placeholder="Employee Name"
            value={emp.name}
            onChange={(e) => handleNameChange(emp.id, e.target.value)}
            style={{ height: "50px", borderRadius: "0" }}
          />
        </td>
        <td>
          <select
            value={emp.status}
            onChange={(e) => handleStatusChange(emp.id, e.target.value)}
            style={{
              backgroundColor: statusColors[emp.status],
              color: statusColorsText[emp.status],
              outline: "none",
              height: "30px",
              border: "0",
              fontSize: "16px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            <option
              value="Clocked Out"
              style={{ backgroundColor: statusColors["Clocked Out"] }}
            >
              Clocked Out
            </option>
            <option
              value="Clocked In"
              style={{ backgroundColor: statusColors["Clocked In"] }}
            >
              Clocked In
            </option>
            <option
              value="Break"
              style={{ backgroundColor: statusColors["Break"] }}
            >
              Break
            </option>
            <option
              value="Lunch"
              style={{ backgroundColor: statusColors["Lunch"] }}
            >
              Lunch
            </option>
          </select>
        </td>
        <td>
          <button className="btn btn-link" onClick={() => toggleLock(emp.id)}>
            {emp.locked ? "Unlock" : "Lock"}
          </button>
        </td>
      </tr>
    ));
  };

  // add new employees
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
    <div>
      <div className="container mt-5">
        {/* input for adding a new employees */}
        <input
          type="text"
          placeholder="Enter New Employee"
          onKeyPress={(e) => {
            // calls add employee funct when you hit enter
            if (e.key === "Enter") {
              addEmployee();
            }
          }}
          style={{ height: "30px", borderRadius: "0" }}
        />

        {/* search table */}
        <input
          type="text"
          className="float-right"
          placeholder="Search table"
          style={{ height: "30px", borderRadius: "0" }}
        />
        <table className="table mt-3">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={isAllChecked}
                  onChange={handleMasterCheckboxChange}
                />
              </th>
              <th>Employee Name</th>
              <th>Status</th>
              <th>Unlock</th>
            </tr>
          </thead>
          <tbody>{renderRows()}</tbody>
          <tfoot>{/*footer*/}</tfoot>
        </table>
      </div>
      {/* bottom buttons */}
      <div className="AdminDashboard_BottomButtons">
        <button
          onClick={handleDeleteSelected}
          className="AdminDashboard_DeleteButton"
        >
          Delete Selected Employee(s)
        </button>
        <button
          onClick={handleLockAll}
          className="AdminDashboard_LockAllButton"
        >
          Lock All
        </button>
      </div>
    </div>
  );
};

export default AdminTable;

//last updated 2/20 -Seif
