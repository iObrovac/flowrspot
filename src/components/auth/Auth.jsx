import React, { useState } from "react";
import LoginModal from "../modals/LoginModal";
import NewAccModal from "../modals/NewAccModal";
import "./Auth.scss";

export default function Auth() {
  const [openModal, setOpenModal] = useState(false);
  const [openNewAcc, setOpenNewAcc] = useState(false);

  return (
    <>
      <div>
        <button className="login" onClick={() => setOpenModal(true)}>
          Login
        </button>
        <button className="new-acc" onClick={() => setOpenNewAcc(true)}>
          New Account
        </button>
      </div>
      <LoginModal open={openModal} onClose={() => setOpenModal(false)} />
      <NewAccModal open={openNewAcc} onClose={() => setOpenNewAcc(false)} />
    </>
  );
}
