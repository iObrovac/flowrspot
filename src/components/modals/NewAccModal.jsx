import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext, UserData } from "../../App";
import "./NewAccModal.scss";

export default function NewAccModal({ open, onClose }) {
  const [values, setValues] = useState({
    name: "",
    lastName: "",
    dob: "",
    email: "",
    password: "",
  });

  const { loggedIn, setLoggedIn, userData, setUserData } =
    useContext(UserContext);

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(values);

    try {
      const response = await axios.post(
        "https://flowrspot-api.herokuapp.com/api/v1/users/register",
        JSON.stringify({
          email: values.email,
          password: values.password,
          first_name: values.name,
          last_name: values.lastName,
          date_of_birth: new Date(values.dob).toDateString(),
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setLoggedIn(true);
      onClose();
      setUserData(values);

      localStorage.setItem("token", response.data.auth_token);
      navigate("/flowers");

      // console.log(response.statusText);
      // console.log(response.data.auth_token);
      // console.log(new Date().toDateString());
    } catch (err) {
      console.log(err.response.data.error);
    }
  };

  if (!open) return null;

  function onChangeInput(e) {
    const { name, value } = e.target;
    setValues((prevState) => ({ ...prevState, [name]: value }));
  }

  return (
    <div className="over" onClick={onClose}>
      <form
        autoComplete="off"
        className="modal-cont"
        onClick={(e) => {
          e.stopPropagation();
        }}
        onSubmit={handleSubmit}
      >
        <h3>Create an Account</h3>
        <div className="first-last-cont">
          <div className="name-cont">
            <h5>First Name</h5>
            <input
              type="text"
              placeholder="Fox"
              name="name"
              value={values.name}
              onChange={onChangeInput}
            />
          </div>
          <div className="last-cont">
            <h5>Last Name</h5>
            <input
              type="text"
              name="lastName"
              placeholder="Mulder"
              value={values.lastName}
              onChange={onChangeInput}
            />
          </div>
        </div>
        <div className="dob-cont">
          <h5>Date of Birth</h5>
          <input
            type="date"
            name="dob"
            value={values.dob}
            onChange={onChangeInput}
          />
        </div>
        <div className="email-cont">
          <h5>Email Address</h5>
          <input
            type="email"
            name="email"
            placeholder="fake@mail.com"
            value={values.email}
            onChange={onChangeInput}
          />
        </div>
        <div className="pass-cont">
          <h5>Password</h5>
          <input
            type="password"
            name="password"
            placeholder="mockPassword"
            value={values.password}
            onChange={onChangeInput}
          />
        </div>
        <button className="create-acc">Create Account</button>
      </form>
    </div>
  );
}
