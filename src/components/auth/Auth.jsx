import React, { useState } from "react";
import "./Auth.scss";

export default function Auth({ closeMobile, openLogin, openNewAcc }) {
  return (
    <>
      <div>
        <button
          className="login"
          onClick={() => {
            console.log("stiso login");
            openLogin();
            closeMobile();
          }}
        >
          Login
        </button>
        <button
          className="new-acc"
          onClick={() => {
            console.log("stiso new-acc");
            openNewAcc();
            closeMobile();
          }}
        >
          New Account
        </button>
      </div>
    </>
  );
}
