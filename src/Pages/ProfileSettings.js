import React, { useRef, useState } from "react";
import "./ProfileSettings.css";
import Logo from "../Photos/HeaderPhotos/dgf.png";
import BackButton from "../Photos/HeaderPhotos/Back Button.png";
import ProfilePicBlack from "../Photos/HeaderPhotos/ProfilePicBlack.png";
import { Link } from "react-router-dom";

const ProfileSettings = () => {
  const fileInputRef = useRef(null);
  // Must change this to save to the databse instead of local storage upon database implementation
  const [selectedImage, setSelectedImage] = useState(localStorage.getItem('selectedImage') || ProfilePicBlack);

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  
  const handleSResetButton = () => {
    setSelectedImage(ProfilePicBlack);
  };

  const handleSaveChanges = () => {
    // Save the selected image to local storage
    localStorage.setItem('selectedImage', selectedImage);
  };

  return (
    <div>
      <div className="ProfileSettings_HeaderContainer">
        <Link to="/DefaultPage">
          <button className="ProfileSettings_BackButton">
            <img
              className="ProfileSettings_BackButtonImage"
              src={BackButton}
              alt=" not found"
            />
          </button>
        </Link>
        <img src={Logo} alt=" not found" className="ProfileSettings_Logo"/>
      </div>
      <div className="ProfileSettings_Body">
        <u>Profile Settings:</u>
        <br />
        <br />
        <img
          src={selectedImage || ProfilePicBlack}
          alt="Profile Picture"
          className="DefaultProfilePic_Black"
        />
        <br />
        <br />
        Upload Image: PNG, JPG, or JPEG
        <br />
        <br />
        Recommended size: 200x200 pixels
        <br />
        <br />
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileSelect}
        />
        <button className="Browse_Button" onClick={handleBrowseClick}>
          Browse your computer
        </button>
        <br />
        <br />
        <button className="ResetProfilePicture_Button" onClick={handleSResetButton}>Reset Profile Picture</button>
        <br />
        <br />
        <button className="SaveChanges_Button" onClick={handleSaveChanges}>Save Changes</button>
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default ProfileSettings;
