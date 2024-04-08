import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";
import Logo from "../Photos/HeaderPhotos/dgf.png";

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/userData/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: username, // Assuming the API expects 'email' instead of 'username'
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Response Data:", data);

      if (typeof data === "object" && data !== null) {
        // Assuming the response contains user data if authentication is successful
        const formattedEmployee = {
          email: data.email,
          name: data.name,
          status: data.status || "Clocked Out",
          locked: data.locked,
          role: data.role,
        };
        handleLogin(formattedEmployee);
        console.log("Formatted Employee Data:", formattedEmployee);
      } else {
        console.error("Invalid data format:", data);
        // Handle authentication failure here
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Username or Password was incorrect!")
      // Handle network error or other exceptions here
    }
  };

  const handleLoginClick = () => {
    // Check if both username and password are filled
    if (username.trim() === "" || password.trim() === "") {
      alert("Please fill in both username and password.");
      return;
    }
    // Perform login process
    fetchUserData();
  };

  return (
    <div className="Body">
      <div className="container">
        <div>
          <img src={Logo} alt="Logo" className="logo" />
        </div>
        <label htmlFor="uname"/>
        <input
          className="Login_Username"
          type="text"
          placeholder="Enter your username"
          name="uname"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="psw"/>
        <input
          className="Login_Password"
          type="password"
          placeholder="Enter your password"
          name="psw"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link to="PasswordRecovery">
          <div className="PasswordRecovery">Forgot your password?</div>
        </Link>
        {/* Call handleLoginClick when the button is clicked */}
        <button
          className="loginbutton"
          type="button"
          onClick={handleLoginClick}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
