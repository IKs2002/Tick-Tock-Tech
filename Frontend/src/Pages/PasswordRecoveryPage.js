import React from "react";
import "./PasswordRecoveryPage.css";
import Logo from "../Photos/HeaderPhotos/dgf.png";
import BackButton from "../Photos/HeaderPhotos/Back Button.png";
import { Link } from "react-router-dom";

const PasswordRecovery = () => {
  return (
    <div>
      <div className="PasswordRecovery_HeaderContainer">
        <Link to="/">
          <button className="PasswordRecovery_BackButton">
            <img
              className="PasswordRecovery_BackButtonImage"
              src={BackButton}
              alt=" not found"
            />
          </button>
        </Link>
        <img src={Logo} alt=" not found" className="PasswordRecovery_Logo"/>
      </div>
      <div className="PasswordRecovery_Body">
        To recover your password, please contact either IT services, or a manager.
        <br />
        <br />
        Thanks!
      </div>
    </div>
  );
};

export default PasswordRecovery;
