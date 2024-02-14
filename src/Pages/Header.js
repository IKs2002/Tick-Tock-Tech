import React from "react";
import Logo from "../Photos/HeaderPhotos/dgf.png";
import profile from "../Photos/HeaderPhotos/profilepic.png";
import settings from "../Photos/HeaderPhotos/settings.png";
import logout from "../Photos/HeaderPhotos/Logout.png";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="MainHeaders">
      <img src={Logo} alt=" not found" className="Logos" />
      <nav className="temp">
        <Link to="ProfileSettings">
        <button className="header-buttons">
          <img src={settings} alt="not found" className="buttonImage" />
        </button>
        </Link>
        <button className="header-buttons">
          <img src={profile} alt="not found" className="buttonImage"/>
        </button>
        <text className="header-buttons">Welcome, User</text>
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
