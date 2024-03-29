import React, { useContext } from "react";
import { UserContext } from "../../App";
import icon from "../../media/img/profile-picture.png";
import "./Auth.scss";
import { INavigationProps } from "../../Types/INav";
import { IContext } from "../../Types/IApp";
import { useSelector } from "react-redux";
import { State } from "../../state";

const Auth: React.FC<INavigationProps> = ({
  closeMobile = () => {},
  openLogin,
  openNewAcc,
  openLogoutModal,
}): JSX.Element => {
  const { loggedIn } = useContext<IContext>(UserContext);

  const userRedux = useSelector((state: State) => state.user);

  if (loggedIn)
    return (
      <div className="user-container" onClick={openLogoutModal}>
        <span className="name-plate">
          {userRedux.first_name} {userRedux.last_name}
        </span>
        <img src={icon} alt="Profile Icon" className="profile-icon" />
      </div>
    );

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
};

export default Auth;
