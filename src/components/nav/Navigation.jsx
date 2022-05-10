import React from "react";
import NavLinks from "./NavLinks";
import "./Nav.scss";

export default function Navigation({ openLogin, openNewAcc, openLogoutModal }) {
  return (
    <nav className="navigation">
      <NavLinks
        openNewAcc={openNewAcc}
        openLogin={openLogin}
        openLogoutModal={openLogoutModal}
      />
    </nav>
  );
}
