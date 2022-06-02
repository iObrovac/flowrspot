import React from "react";
import { Link } from "react-router-dom";
import Auth from "../auth/Auth";
import "./Nav.scss";
import { INavigationProps } from "../../Types/INav";

const NavLinks: React.FC<INavigationProps> = ({
  hide = false,
  closeMobile = () => {},
  openLogin,
  openNewAcc,
  openLogoutModal,
}): JSX.Element => {
  return (
    <div className={`link-container ${hide && "link-container--hide"}`}>
      <Link onClick={closeMobile} to="/flowers" className="nav-links">
        Flowers
      </Link>
      <Link onClick={closeMobile} to="/sightings" className="nav-links">
        Latest Sightings
      </Link>
      <Link onClick={closeMobile} to="/favorites" className="nav-links">
        Favorites
      </Link>
      <Auth
        openNewAcc={openNewAcc}
        openLogin={openLogin}
        openLogoutModal={openLogoutModal}
        closeMobile={closeMobile}
      />
    </div>
  );
};

export default NavLinks;
