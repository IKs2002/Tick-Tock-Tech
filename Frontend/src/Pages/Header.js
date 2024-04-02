import React from "react";
import Logo from "../Photos/HeaderPhotos/dgf.png";
import logout from "../Photos/HeaderPhotos/Logout.png";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="MainHeaders">
      <img src={Logo} alt=" not found" className="Logos" />
      <nav className="temp">
        <div className="header-buttons">Welcome, User</div>
        <Link to="/">
          <button className="header-buttons">
            <img src={logout} alt="not found" className="buttonImage" />
          </button>
        </Link>
      </nav>
    </div>
  );
};

export default Header;
