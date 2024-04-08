import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";
import Logo from "../Photos/HeaderPhotos/dgf.png";

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/userData/getuser/uid=${username}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Response Data:", data);

      if (typeof data === 'object' && data !== null) {
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
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLoginClick = () => {
    // Perform login process
    fetchUserData();
  };

  return (
    <div className="Body">
      <div className="container">
        <div>
          <img src={Logo} alt="Logo" className="logo" />
        </div>
        <label htmlFor="uname"></label>
        <input
          className="Login_Username"
          type="text"
          placeholder="Email"
          name="uname"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="psw"></label>
        <input
          className="Login_Password"
          type="password"
          placeholder="Password"
          name="psw"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link to="PasswordRecovery">
          <div className="PasswordRecovery">Forgot your password?</div>
        </Link>
        {/* Call handleLoginClick when the button is clicked */}
        <button className="loginbutton" type="button" onClick={handleLoginClick}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
