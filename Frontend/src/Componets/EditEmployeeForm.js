import React, { useState } from "react";
import "./EditEmployeeForm.css";
import Modal from "react-modal";
import EditButton from "../Photos/AdminDashboardButtons/pencil.png";


const EditEmployeeForm = ({ employee }) => {
  const [form, setForm] = useState(employee || { name: "", email: "", password: "" });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update the employee details on the server
    fetch(`http://localhost:5000/api/userData/${form.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update employee details");
        }
        return response.json();
      })
      .then((data) => {
        setForm(data); // Update the employee object directly in the UI
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      {/* Button to open the modal for editing an existing employee's details */}
      <button
        className="btn btn-link edit-btn"
        onClick={() => setModalIsOpen(true)}
        >
        <img
          src={EditButton}
          alt="not found"
          className="EditButton"
        />
      </button>
      {/* Modal component for editing an existing employee, contains form with inputs for name, email, and password*/}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="modal"
        >
        {/* Form for editing an existing employee, with inputs for name, email, and password, and submit and cancel buttons*/}
        <form onSubmit={handleSubmit} className="employee-form">
          {/* Input for employee's name ALSO COMMENTS must be made like this in children */}
          <h2 className="EmployeeFormTitle">Edit Employee</h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleInputChange}
            required
            autoComplete="off"
            className="employee-form-field"
          />
          {/* Input for employee's email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            required
            autoComplete="off"
            onChange={handleInputChange}
            className="employee-form-field"
          />
          {/* Input for employee's password, visibility toggles based on if a password is present */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            required
            onChange={handleInputChange}
            autoComplete="off"
            className="employee-form-field"
          />
          {/* Container for form action buttons */}
          <div className="form-buttons">
            {/* Button to submit the form, updating the existing employee*/}
            <button type="submit" className="ConfirmButton">
              Update
            </button>
            {/* Button to cancel and close the modal without updating the employee*/}
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

export default EditEmployeeForm;