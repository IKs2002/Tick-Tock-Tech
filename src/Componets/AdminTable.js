import React, { useState } from 'react';
import './AdminTable.css';

const AdminTable = () => {
    // state of employees
    const [employees, setEmployees] = useState([
        { id: 1, name: '', status: 'Clocked Out', locked: false },
        { id: 2, name: '', status: 'Clocked Out', locked: false },
        { id: 3, name: '', status: 'Clocked Out', locked: false },
        { id: 4, name: '', status: 'Clocked Out', locked: false },
    ]);

    // toggle employee lock status
    const toggleLock = (id) => {
        setEmployees(prevEmployees =>
            prevEmployees.map(emp =>
                emp.id === id ? { ...emp, locked: !emp.locked } : emp
            )
        );
    };

    // changes in employee name
    const handleNameChange = (id, newName) => {
        setEmployees(prevEmployees =>
            prevEmployees.map(emp =>
                emp.id === id ? { ...emp, name: newName } : emp
            )
        );
    };

    // chnages in employee status
    const handleStatusChange = (id, newStatus) => {
        setEmployees(prevEmployees =>
            prevEmployees.map(emp =>
                emp.id === id ? { ...emp, status: newStatus } : emp
            )
        );
    };

    // rows for employees
    const renderRows = () => {
        return employees.map(emp => (
            <tr key={emp.id}>
                <td>
                    <input type="checkbox" />
                </td>
                <td>
                    <input
                        type="text"
                        placeholder="Employee Name"
                        value={emp.name}
                        onChange={e => handleNameChange(emp.id, e.target.value)}
                        style={{ height: '50px', borderRadius: '0'}}
                    />
                </td>
                <td>
                    <select
                        value={emp.status}
                        onChange={e => handleStatusChange(emp.id, e.target.value)}
                    >
                        <option value="Clocked Out">Clocked Out</option>
                        <option value="Clocked In">Clocked In</option>
                        <option value="Break">Break</option>
                        <option value="Lunch">Lunch</option>
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
        setEmployees(prevEmployees => [
            ...prevEmployees,
            { id: prevEmployees.length + 1, name: '', status: 'Clocked Out', locked: false }
        ]);
    };

    return (
        <div className="container mt-5">
            {/* input for adding a new employees */}
            <input 
                type="text" 
                placeholder="Enter New Employee"
                onKeyPress={e => {
                    // calls add employee funct when you hit enter
                    if (e.key === 'Enter') {
                        addEmployee();
                    }
                }}
                style={{ height: '30px', borderRadius: '0'}}
            />

            {/* search table */}
            <input 
                type="text" 
                className="float-right" 
                placeholder="Search table"
                style={{ height: '30px', borderRadius: '0'}} />
            <table className="table mt-3">
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox" />
                        </th>
                        <th>Employee Name</th>
                        <th>Status</th>
                        <th>Unlock</th>
                    </tr>
                </thead>
                <tbody>{renderRows()}</tbody>
                <tfoot>
                    {/*footer*/}
                </tfoot>
            </table>
        </div>
    );
};

export default AdminTable;

//last updated 2/14 -sierra