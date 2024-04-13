import React from "react";
import Logo from "../Photos/HeaderPhotos/dgf.png";
import logout from "../Photos/HeaderPhotos/Logout.png";
import "./Header.css";
import { Link, useNavigate} from "react-router-dom";

const Header = ({name}) => {
  const navigate = useNavigate();
  const handleLogout = () => {
  // Clear user data from local storage
  localStorage.removeItem('user');
  // Clear the browser history stack
  window.history.replaceState(null, "", "/");
  // Redirect to the login page and replace the current entry in the browser history
  window.location.replace("/");
};



  console.log(name)
  return (
    <div className="MainHeaders">
      <img src={Logo} alt=" not found" className="Logos" />
      <nav className="temp">
        <label className="header-buttons">Welcome, {name} </label>
          <button className="header-buttons"  onClick={handleLogout}>
            <img src={logout} alt="not found" className="buttonImage" />
          </button>
      </nav>
    </div>
  );
};

export default Header;
