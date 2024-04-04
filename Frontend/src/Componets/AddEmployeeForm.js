import React, { useState } from "react";
import "./AddEmployeeForm.css";
import Modal from "react-modal";
import eye_open from "../Photos/AddEmployeePhotos/eye_open.png";
import eye_close from "../Photos/AddEmployeePhotos/eye_close.png";

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
    id: "", // Import uuidv4 from a library like uuid
    name: "",
    email: "",
    password: generateRandomPassword(), // Update password with a random password
    role: "employee", // Default value set to "employee"
  });

  // State for controlling the visibility of the modal
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // State for toggling password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Handles changes in form inputs, updating the state accordingly
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
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
        const newEmployee = {
          id: data.user._id,
          name: data.user.name,
          status: "Clocked Out",
          role: data.user.role,
          locked: false,
        };
        addEmployee(newEmployee);

        setForm({
          id: "",
          name: "",
          email: "",
          password: generateRandomPassword(),
          role: "employee", //set to employee by default
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
            autocomplete="off"
            onChange={handleInputChange}
            className="employee-form-field"
          />
          {/* Input for employee's password, visibility toggles based on if a password is present */}
          <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
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
            value={form.role}
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

/*Credit for free graphic:
<a href="https://www.freepik.com/icon/low-vision_7485164#fromView=resource_detail&position=0">Icon by Ivan Abirawa</a>*/