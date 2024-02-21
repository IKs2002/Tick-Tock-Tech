import React from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";
import Logo from "../Photos/HeaderPhotos/dgf.png";

const Login = () => {
  return (
    <body className="Body">
      <div class="container">
        <div>
          <img src={Logo} alt="Logo" class="logo" />
        </div>

        <label for="uname"></label>
        <input
        className="Login_Username"
          type="text"
          placeholder="user@digitaldreamforge.com"
          name="uname"
          required
        />

        <label for="psw"></label>
        <input className="Login_Password" type="password" placeholder="Password" name="psw" required />
        <Link to="PasswordRecovery">
          <text className="PasswordRecovery">Forgot your password?</text>
        </Link>
        <Link to="DefaultPage">
          <button className="loginbutton" type="submit">
            Login
          </button>
        </Link>
      </div>
    </body>
  );
};

export default Login;
