import React from "react";
import "./LoginModal.scss";

export default function LoginModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <form
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modal-container"
      >
        <h1>Welcome Back</h1>
        <div className="email-container">
          <h5>Email Address</h5>

          <input
            autoComplete="off"
            className="input-field"
            type="email"
            placeholder="fake@mail.com"
          />
        </div>
        <div className="password-container">
          <h5>Password</h5>
          <input
            autoComplete="off"
            className="input-field"
            type="password"
            placeholder="mockPassword"
          />
        </div>
        <button className="login-btn">Login to your Account</button>
      </form>
    </div>
  );
}
