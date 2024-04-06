import React, { useState, useEffect } from "react";
import "./EditEmployeeForm.css";
import Modal from "react-modal";
import EditButton from "../Photos/AdminDashboardButtons/pencil.png";
import eye_open from "../Photos/AddEmployeePhotos/eye_open.png";
import eye_close from "../Photos/AddEmployeePhotos/eye_close.png";
Modal.setAppElement('#root');

const EditEmployeeForm = ({ employee }) => {
  // Initialize form state with empty values or with values from the employee prop
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "", // Consider security implications of handling passwords
    // Add other fields as necessary
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Update form state when employee prop changes
  useEffect(() => {
    if (employee) {
      setForm({
        name: employee.name,
        email: employee.id,
        password: employee.password, // No current password attached to employee object, will wait until further security work
        role: employee.role
        // Populate other fields as necessary
      });
    }
  }, [employee]);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // Update the employee details on the server
    console.log(form);
    fetch(`http://localhost:5000/api/userData/patchuser/${encodeURIComponent(form.email)}`, {
      method: "PATCH",
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
      /*.then((data) => {
        setForm(data); // Update the employee object directly in the UI
      })*/
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
            value={form.name || ''}
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
            value={form.email || ''}
            required
            autoComplete="off"
            onChange={handleInputChange}
            className="employee-form-field"
          />
          {/* Input for employee's password, visibility toggles based on if a password is present */}
          <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password || ''}
              required
              onChange={handleInputChange}
              autoComplete="off"
              className="employee-form-field"
            />
              <span onClick={togglePasswordVisibility} style={{ cursor: "pointer", position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center" }}>
                {passwordVisible ? <img src={eye_close} alt="Hide Password" style={{ width: "20px" }}/> : <img src={eye_open} alt="Show Password" style={{ width: "20px" }}/>}
              </span>
          </div>
          {/* select for employee's role level */}
          <select
            name="role"
            value={form.role || ''}
            onChange={handleInputChange}
            className="employee-form-field"
          >
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
          {/* Container for form action buttons */}
          <div className="form-buttons">
            {/* Button to submit the form, adding a new employee*/}
            <button type="ResetPassword" className="ResetPasswordButton">
              Reset Password
            </button>
            {/* Button to submit the form, updating the existing employee*/}
            <button type="Update" className="UpdateButton">
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