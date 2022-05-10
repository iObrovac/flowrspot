import React, { useState } from "react";
import "./Auth.scss";

export default function Auth({ closeMobile, openLogin, openNewAcc }) {
  return (
    <>
      <div>
        <button
          className="login"
          onClick={() => {
            openLogin();
            closeMobile();
          }}
        >
          Login
        </button>
        <button
          className="new-acc"
          onClick={() => {
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
