import React, { useState } from "react";
import "./ManagerTable.css";


const ManagerTable = () => {
  const [employees] = useState([
    { id: 1, name: "John Smith", status: "Clocked Out" },
    { id: 2, name: "Jane Doe", status: "Clocked In" },
    { id: 3, name: "Emily Johnson", status: "Meal" },
    { id: 4, name: "Mark Rodgers", status: "Break" },
  ]);

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

  const renderRows = () => {
    return employees
      .filter((emp) =>
        emp.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map((emp) => (
        <tr key={emp.id}>
          <td><div className="employee-name">{emp.name}</div></td>
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