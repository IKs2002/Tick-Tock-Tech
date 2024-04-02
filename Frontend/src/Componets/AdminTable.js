import React, { useState, useEffect } from "react";
//import { useHistory } from "react-router-dom"; // Import useHistory from react-router-dom
import "./AdminTable.css";
import AddEmployeeForm from "./AddEmployeeForm";
import DeleteButton from "../Photos/AdminDashboardButtons/DeleteButton.png";
import EditButton from "../Photos/AdminDashboardButtons/pencil.png";

// Defines the AdminTable component responsible for displaying and managing employees in the admin dashboard
const AdminTable = ({ navigateToTimesheetEdit }) => {
  // State to store and manage the list of employees
  const [employees, setEmployees] = useState([]);

  // State to manage the search query for filtering employees
  const [searchQuery, setSearchQuery] = useState("");

  // Object mapping employee statuses to their corresponding background and text colors
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

  // Function to toggle the lock status of an employee
  const toggleLock = (email) => {
    const userIndex = employees.findIndex(emp => emp.id === email);
    if (userIndex === -1) return;
  
    const newStatus = !employees[userIndex].locked;
    
    fetch(`http://localhost:5000/api/userData/toggleLock/${encodeURIComponent(email)}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accessLock: newStatus }),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to toggle lock status");
      }
      return response.json();
    })
    .then(() => {
      setEmployees((prevEmployees) =>
        prevEmployees.map((emp, idx) =>
          idx === userIndex ? { ...emp, locked: newStatus } : emp
        )
      );
    })
    // .then(() => {
    //   fetchAllEmployees();
    // })
    .catch((error) => console.error("Error:", error));
  };

  // Function to lock or unlock all employees based on their current lock status
  const handleLockAll = () => {
    const anyUnlocked = employees.some((emp) => !emp.locked);
    const action = anyUnlocked ? "lock" : "unlock";
    const confirmed = window.confirm(
      `Are you sure you want to ${action} all employees?`
    );
  
    if (confirmed) {
      // Send a request to the server to lock/unlock all users
      fetch(`http://localhost:5000/api/userData/toggleAllLocks`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lockAll: anyUnlocked }),
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update lock status for all users");
        }
        
        return response.json();
      })
      .then(() => {
        setEmployees((prevEmployees) =>
          prevEmployees.map((emp) => ({ ...emp, locked: anyUnlocked }))
        );
      })
      // .then(() => {
      //   fetchAllEmployees();
      // })
      .catch((error) => console.error("Error:", error));
    }
  };
  // Function to delete an employee after confirmation
  const deleteEmployee = (email) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (confirmed) {
      const queryParameter = `?email=${encodeURIComponent(email)}`;
      fetch(`http://localhost:5000/api/userData/delete${queryParameter}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete the user");
          }
          return response.json();
        })
        .then(() => {
          fetchAllEmployees();
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  //Function to Edit an employee
  const EditEmployee = (email) => {

  }

  // Function to toggle the visibility of a popup associated with an employee
  const myFunction = (empId) => {
    var popup = document.getElementById(`myPopup-${empId}`);
    if (popup) {
      popup.classList.toggle("show");
    }
  };

  // Use React Router's useHistory hook to get access to the history object

  // Modified onClick handler to navigate to another page
  // Function to navigate to the TimesheetEdit page with employee ID
  const navigateToEmployeePage = (empId, empName) => {
    console.log("Employee ID:", empId); // Log empId to check if it's undefined
    console.log("Employee Name:", empName); // Log empName for debugging
    navigateToTimesheetEdit(empId, empName);
  };
  

  // Renders the rows of the employee table, filtering based on the search query
  const renderRows = () => {
    console.log("Employees:", employees); // Log employees array
    return employees
      .filter((emp) => emp.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .map((emp) => (
        <tr key={emp.id}>
          {/* Other table cells */}
          <td
            onClick={() => {
              console.log("Clicked on employee:", emp.id); // Log emp.id before navigating
              navigateToEmployeePage(emp.id, emp.name);
            }} // Modified onClick handler
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "-1.5%",
              cursor: "pointer", // Change cursor to pointer when hovering over the cell
            }}
            className="clickable-cell" // Add a class for additional styling
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
                color: emp.locked ? "#ED5E61" : "#708090",
                border: "0px",
                width: "6vw",
                height: "4.3vh",
                fontSize: "1.2vw",
                fontWeight: "bold",
                textAlign: "center",
                marginLeft: "7%",
                background: "none",
              }}
            >
              {emp.locked ? "Unlock" : "Lock"}{" "}
              {/*Changes button text based on the lock status*/}
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
          <td>
            {/* Edit Button */}
            <button
              className="btn btn-link edit-btn"
              onClick={(e) => {
                EditEmployee(emp.id);
              }}
            >
              <img
                src={EditButton}
                alt="not found"
                className="EditButton"
              />
            </button>
          </td>
        </tr>
      ));
  };

  // Add new employees
  const addEmployee = (newEmployee) => {
    console.log("Added employee:");
    console.log("- ID:", newEmployee.id);
    console.log("- Name:", newEmployee.name);
    console.log("- Email:", newEmployee.email);
    console.log("- Password:", newEmployee.password);

    setEmployees((prevEmployees) => [
      ...prevEmployees,
      {
        id: prevEmployees.length + 1,
        name: newEmployee.name,
        status: "Clocked Out",
        locked: false,
      },
    ]);

    console.log("Employee added successfully:", newEmployee);
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
            placeholder="  Search table" /* placeholder text for the search*/
            value={
              searchQuery
            } /*  Binds the input value to the searchQuery state*/
            onChange={(e) =>
              setSearchQuery(e.target.value)
            } /* Updates the searchQuery state on input change*/
          />
        </div>
        {/* Table for displaying employees */}
        <table className="table mt-3">
          <thead>
            <tr>
              <th>Employee Name</th>{/*Column header for employee names */}
              <th>Status</th>{/* Column header for employee status*/}
              <th>Access</th>{/* Column header for lock/unlock action*/}
              <th>Manage</th>{/* Column header for delete action*/}
              <th>Edit</th>{/* Column header for Edit action*/}
            </tr>
          </thead>
          <tbody>{renderRows()}</tbody>
          {/* Calls renderRows to populate the table body with employee data*/}
          <tfoot>{/* Footer */}</tfoot>
        </table>

        {/* Bottom buttons */}
        <div className="AdminDashboard_BottomButtons">
          {/* Button to lock or unlock all employees */}
          <button
            onClick={handleLockAll}
            className="AdminDashboard_LockAllButton"
          >
            {employees.every((emp) => emp.locked) ? "Unlock All" : "Lock All"}{" "}
            {/* Changes button text based on the lock status of all employees */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminTable; // export admintable component

//last updated 2/25 -Sierra
