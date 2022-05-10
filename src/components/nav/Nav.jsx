import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Nav.scss";
import logo1 from "../../media/img/flower.svg";
import logo2 from "../../media/img/flower-text.svg";
import Navigation from "./Navigation";
import MobileNavigation from "./MobileNavigation";
import LoginModal from "../modals/LoginModal";
import NewAccModal from "../modals/NewAccModal";

export default function Nav() {
  const [openModal, setOpenLogin] = useState(false);
  const [openNewAcc, setOpenNewAcc] = useState(false);

  const openLogin = () => setOpenLogin(true);
  const openAcc = () => setOpenNewAcc(true);

  return (
    <div className="nav">
      <div className="logo-container">
        <Link className="nav__home" to="/">
          <img className="logo-1" src={logo1} alt="logo-1" />
          <img className="logo-2" src={logo2} alt="logo-2" />
        </Link>
      </div>

      <Navigation openLogin={openLogin} openNewAcc={openAcc} />
      <MobileNavigation openLogin={openLogin} openNewAcc={openAcc} />
      <LoginModal open={openModal} onClose={() => setOpenLogin(false)} />
      <NewAccModal open={openNewAcc} onClose={() => setOpenNewAcc(false)} />
    </div>
  );
}
