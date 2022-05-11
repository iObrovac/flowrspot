import React, { useContext } from "react";
import { UserContext } from "../../App";
import profilePic from "../../media/img/profile-picture-2.png";
import "./LogoutModal.scss";

function LogoutModal({ open, onClose }) {
  const { userData, setLoggedIn } = useContext(UserContext);

  if (!open) return null;

  return (
    <div className="logout-overlay" onClick={onClose}>
      <div className="logout-container" onClick={(e) => e.stopPropagation()}>
        <p className="logout-close" onClick={onClose}>
          X
        </p>
        <div className="logout-name-card">
          <img src={profilePic} alt="Profile Picture 2" />
          <div>
            <h3>
              {userData.name} {userData.lastName}
            </h3>
            <h5>41 sightings</h5>
          </div>
        </div>
        <div className="logout-first">
          <h5>First Name</h5>
          <h3> {userData.name}</h3>
        </div>
        <div className="logout-last">
          <h5>Last Name</h5>
          <h3>{userData.lastName}</h3>
        </div>
        {userData?.dob && (
          <div className="logout-dob">
            <h5>Date of Birth</h5>
            <h3>{new Date(userData.dob).toDateString()}</h3>
          </div>
        )}
        {userData?.email && (
          <div className="logout-email">
            <h5>Email Address</h5>
            <h3>{userData.email}</h3>
          </div>
        )}
        <button
          className="logout-btn"
          onClick={() => {
            onClose();
            setLoggedIn(false);
            localStorage.removeItem("token");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default LogoutModal;
