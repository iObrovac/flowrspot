import React from "react";
import NavLinks from "./NavLinks";
import "./Nav.scss";
import { CgMenuRound } from "react-icons/cg";
import { FaWindowClose } from "react-icons/fa";
import { useState } from "react";

export default function MobileNavigation({ openLogin, openNewAcc }) {
  const [open, setOpen] = useState(false);

  const closeMobile = () => setOpen(false);
  const toggleOpen = () => setOpen(!open);

  const burgerIcon = (
    <CgMenuRound
      className="burger"
      size="40px"
      color="#eaa79e"
      onClick={toggleOpen}
    />
  );
  const closeIcon = (
    <FaWindowClose
      className="burger"
      size="40px"
      color="#eaa79e"
      onClick={toggleOpen}
    />
  );
  return (
    <nav className="mobile-navigation">
      {open ? closeIcon : burgerIcon}
      <NavLinks
        hide={!open}
        openNewAcc={openNewAcc}
        openLogin={openLogin}
        closeMobile={closeMobile}
      />
    </nav>
  );
}
