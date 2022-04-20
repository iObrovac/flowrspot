import React from "react";
import { Link } from "react-router-dom";
import "./Nav.scss";
import logo1 from "../../media/img/flower.svg";
import logo2 from "../../media/img/flower-text.svg";
import Auth from "../auth/Auth";

export default function Nav() {
  return (
    <div className="nav">
      <div className="logo-container">
        <Link className="nav__home" to="/">
          <img className="logo-1" src={logo1} alt="logo-1" />
          <img className="logo-2" src={logo2} alt="logo-2" />
        </Link>
      </div>
      <div className="link-container">
        <Link to="/flowers" className="nav-links">
          Flowers
        </Link>
        <Link to="/sightings" className="nav-links">
          Latest Sightings
        </Link>
        <Link to="/favorites" className="nav-links">
          Favorites
        </Link>
        <Auth />
      </div>
    </div>
  );
}
