import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // Import uuidv4 from the uuid library
import "./AddEmployeeForm.css";
import Modal from "react-modal";

// Component for adding a new employee, receives addEmployee function and initialName as props
const AddEmployeeForm = ({ addEmployee }) => {
  // Function to generate a random password
  const generateRandomPassword = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < 18; i++) {
      password += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return password;
  };

  // State for managing form inputs and modal visibility
  const [form, setForm] = useState({
    id: uuidv4(), // Import uuidv4 from a library like uuid
    name: "",
    email: "",
    password: generateRandomPassword(), // Update password with a random password
  });

  // State for controlling the visibility of the modal
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Handles changes in form inputs, updating the state accordingly
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Inside the handleSubmit function
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/api/userData/post/`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(form),
    })
      .then((response) => {
        if (response.headers.get("Content-Type").includes("application/json")) {
          return response.json();
        } else {
          throw new Error("Received non-JSON response from server");
        }
      })
      .then((data) => {
        console.log("Success:", data);
        setForm({
          id: uuidv4(),
          name: "",
          email: "",
          password: generateRandomPassword(),
        });
        setModalIsOpen(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  // Renders the button to open the modal and the modal itself, which contains the form for adding a new employee
  return (
    <div>
      {/* Button to open the modal for entering a new employee's details */}
      <button
        className="AdminDashboard_EnterNewEmployee"
        onClick={() => setModalIsOpen(true)}
      >
        Enter New Employee
      </button>
      {/* Modal component for adding a new employee, contains form with inputs for name, email, and password*/}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="modal"
      >
        {/* Form for adding a new employee, with inputs for name, email, and password, and submit and cancel buttons*/}
        <form onSubmit={handleSubmit} className="employee-form">
          {/* Input for employee's name ALSO COMMENTS must be made like this in children */}
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
          {/* Input for employee's email */}
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
          {/* Input for employee's password, visibility toggles based on if a password is present */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            required
            onChange={handleInputChange}
            autocomplete="off"
            className="employee-form-field"
          />
          {/* Container for form action buttons */}
          <div className="form-buttons">
            {/* Button to submit the form, adding a new employee*/}
            <button type="submit" className="ConfirmButton">
              Confirm
            </button>
            {/* Button to cancel and close the modal without adding a new employee */}
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

// Metadata comment indicating the creator and last edit date of the file
//Created and last edited by Seif Ikbarieh on 2/25/2024.
