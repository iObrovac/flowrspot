import React, { useContext } from "react";
import { UserContext } from "../../App";
import profilePic from "../../media/img/profile-picture-2.png";
import "./LogoutModal.scss";
import { IModalProps } from "../../Types/IModals";
import { IContext } from "../../Types/IApp";
import { useSelector } from "react-redux";
import { State } from "../../state";
import { IUserInfo } from "../../state/actions/actions";
import { IState } from "../../state/reducers/userReducer";

const LogoutModal: React.FC<IModalProps> = ({ open, onClose }): JSX.Element => {
  const { setLoggedIn } = useContext<IContext>(UserContext);
  const userRedux = useSelector((state: State) => state.user);

  if (!open) return null;

  console.log(userRedux);

  return (
    <div className="logout-overlay" onClick={onClose}>
      <div className="logout-container" onClick={(e) => e.stopPropagation()}>
        <p className="logout-close" onClick={onClose}>
          X
        </p>
        <div className="logout-name-card">
          <img src={profilePic} alt="Profile Picture 2" />
          <div>
            <h3>
              {userRedux.first_name} {userRedux.last_name}
            </h3>
            <h5>41 sightings</h5>
          </div>
        </div>
        <div className="logout-first">
          <h5>First Name</h5>
          <h3> {userRedux.first_name}</h3>
        </div>
        <div className="logout-last">
          <h5>Last Name</h5>
          <h3>{userRedux.last_name}</h3>
        </div>

        <div className="logout-dob">
          <h5>Date of Birth</h5>
          <h3>{new Date(userRedux.date_of_birth).toDateString()}</h3>
        </div>

        <div className="logout-email">
          <h5>Email Address</h5>
          <h3>{userRedux.email}</h3>
        </div>

        <button
          className="logout-btn"
          onClick={() => {
            onClose();
            setLoggedIn(false);
            localStorage.removeItem("token");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default LogoutModal;
