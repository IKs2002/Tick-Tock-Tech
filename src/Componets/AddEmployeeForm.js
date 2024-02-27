import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4 from the uuid library
import "./AddEmployeeForm.css";
import Modal from "react-modal";

const AddEmployeeForm = ({ addEmployee, initialName }) => {
  const [form, setForm] = useState({
    id: uuidv4(), // Import uuidv4 from a library like uuid
    name: initialName,
    email: "",
    password: "Password.@123",
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const employeeWithId = { ...form, id: uuidv4() };
    addEmployee(employeeWithId);
    setForm({ id: uuidv4(), name: "", email: "", password: "Password.@123" });
    setModalIsOpen(false);
  };

  return (
    <div>
      <button
        className="AdminDashboard_EnterNewEmployee"
        onClick={() => setModalIsOpen(true)}
      >
        Enter New Employee
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="modal"
      >
        <form onSubmit={handleSubmit} className="employee-form">
          <h2 className="EmployeeFormTitle">Add New Employee</h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleInputChange}
            required
            autocomplete="off"
            className="employee-form-field"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            required
            autocomplete="off"
            onChange={handleInputChange}
            className="employee-form-field"
          />
          <input
            type={form.password ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            required
            onChange={handleInputChange}
            autocomplete="off"
            className="employee-form-field"
          />
          <div className="form-buttons">
            <button type="submit" className="ConfirmButton">
              Confirm
            </button>
            <button
              type="button"
              onClick={() => setModalIsOpen(false)}
              className="CancelButton"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddEmployeeForm;

//Created and last edited by Seif Ikbarieh on 2/25/2024.
