import React from "react";
import NavLinks from "./NavLinks";
import "./Nav.scss";
import { INavigationProps } from "../../Types/INav";

const Navigation: React.FC<INavigationProps> = ({
  openLogin,
  openNewAcc,
  openLogoutModal,
}): JSX.Element => {
  return (
    <nav className="navigation">
      <NavLinks
        openNewAcc={openNewAcc}
        openLogin={openLogin}
        openLogoutModal={openLogoutModal}
      />
    </nav>
  );
};

export default Navigation;
