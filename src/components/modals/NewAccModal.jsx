import React from "react";
import "./NewAccModal.scss";

export default function NewAccModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="over" onClick={onClose}>
      <form
        autoComplete="off"
        className="modal-cont"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h3>Create an Account</h3>
        <div className="first-last-cont">
          <div className="name-cont">
            <h5>First Name</h5>
            <input type="text" placeholder="Fox" />
          </div>
          <div className="last-cont">
            <h5>Last Name</h5>
            <input type="text" placeholder="Mulder" />
          </div>
        </div>
        <div className="dob-cont">
          <h5>Date of Birth</h5>
          <input type="date" />
        </div>
        <div className="email-cont">
          <h5>Email Address</h5>
          <input type="email" placeholder="fake@mail.com" />
        </div>
        <div className="pass-cont">
          <h5>Password</h5>
          <input type="password" placeholder="mockPassword" />
        </div>
        <button className="create-acc">Create Account</button>
      </form>
    </div>
  );
}
