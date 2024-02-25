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
  };

  return (
    <div>
      <button
        className="AdminDashboard_EnterNewEmployee"
        onClick={() => setModalIsOpen(true)}
      >
        Enter New Employee
      </button>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleInputChange}
          />
          <input
            type={form.password ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleInputChange}
          />
          <button type="submit">Add Employee</button>
        </form>
      </Modal>
    </div>
  );
};

export default AddEmployeeForm;
