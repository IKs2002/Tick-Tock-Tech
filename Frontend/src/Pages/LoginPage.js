import React from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";
import Logo from "../Photos/HeaderPhotos/dgf.png";

const Login = () => {
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
        />

        <label htmlFor="psw"></label>
        <input className="Login_Password" type="password" placeholder="Password" name="psw" required />
        <Link to="PasswordRecovery">
          <div className="PasswordRecovery">Forgot your password?</div>
        </Link>
        <Link to="Home/PersonalTimeSheet">
          <button className="loginbutton" type="submit">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
