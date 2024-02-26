import React, { useState } from "react";
import "./AddEmployeeForm.css";
import Modal from "react-modal";

const AddEmployeeForm = ({ addEmployee, initialName }) => {
  const [form, setForm] = useState({
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
    addEmployee(form);
    setForm({ name: "", email: "", password: "Password.@123" });
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
            className="employee-form-field"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            required
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