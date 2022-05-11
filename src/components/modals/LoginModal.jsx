import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import "./LoginModal.scss";

export default function LoginModal({ open, onClose }) {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const { loggedIn, setLoggedIn, setUserData } = useContext(UserContext);
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);

    try {
      const response = await axios.post(
        "https://flowrspot-api.herokuapp.com/api/v1/users/login",
        JSON.stringify({
          email: values.email,
          password: values.password,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setLoggedIn(true);
      onClose();
      localStorage.setItem("token", response.data.auth_token);

      console.log(response.statusText);
      console.log(response.data.auth_token);
    } catch (err) {
      console.log(err.response.data.error);
    }

    navigate("/flowers");

    //////////// GIVE ME DATA ABOUT THE USER /////////////////////

    try {
      const data = await axios.get(
        "https://flowrspot-api.herokuapp.com/api/v1/users/me",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // console.log(data);

      setUserData({
        name: data.data.user.first_name,
        lastName: data.data.user.last_name,
        dob: new Date().toDateString(), // there is no dob field in the response
        email: values.email,
        password: values.password,
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (!open) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <form
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modal-container"
        onSubmit={handleSubmit}
      >
        <h1>Welcome Back</h1>
        <div className="email-container">
          <h5>Email Address</h5>

          <input
            autoComplete="off"
            className="input-field"
            type="email"
            placeholder="fake@mail.com"
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
        </div>
        <div className="password-container">
          <h5>Password</h5>
          <input
            className="input-field"
            type="password"
            placeholder="mockPassword"
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          />
        </div>
        <button className="login-btn">Login to your Account</button>
      </form>
    </div>
  );
}
