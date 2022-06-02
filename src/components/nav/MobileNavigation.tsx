import React from "react";
import NavLinks from "./NavLinks";
import "./Nav.scss";
import { CgMenuRound } from "react-icons/cg";
import { FaWindowClose } from "react-icons/fa";
import { useState } from "react";
import { INavigationProps } from "../../Types/INav";

const MobileNavigation: React.FC<INavigationProps> = ({
  openLogin,
  openNewAcc,
}): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);

  const closeMobile: () => void = () => setOpen(false);
  const toggleOpen: () => void = () => setOpen(!open);

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
};

export default MobileNavigation;
