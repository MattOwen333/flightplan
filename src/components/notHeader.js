import React, { useState, useEffect } from "react";

import { getCurrentUser, storeCurrentUser, clearCurrentUser } from "../Auth";
import Modal from "react-modal";
import { Register, Login } from ".";

import "./Header.css";

Modal.setAppElement("#root");
const Header = ({ currentUser, setCurrentUser }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalRegisterIsOpen, setRegisterModalIsOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleUserLogin = (event) => {
    storeCurrentUser(selectedUser); // this deals with localstorage
    setCurrentUser(selectedUser);

    setIsLoggedIn(true); // this deals with Component State
  };

  const handleUserLogout = (event) => {
    clearCurrentUser();
  };

  useEffect(() => {
    let user = getCurrentUser();

    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div id="header">
      <header>
        <button onClick={() => setModalIsOpen(true)}>Login</button>
        {isLoggedIn ? null : (
          <>
            <Modal isOpen={modalIsOpen}>
              <Login toggleModal={setModalIsOpen}></Login>
            </Modal>
            <button onClick={() => setRegisterModalIsOpen(true)}>
              Register
            </button>
            <Modal isOpen={modalRegisterIsOpen}>
              <Register toggleModal={setRegisterModalIsOpen}></Register>
            </Modal>
            <button onClick={handleUserLogout}>Logout {currentUser}</button>
          </>
        )}
      </header>
    </div>
  );
};
// export default Header;

// add all groups and my groups using router
// use a ternary to show and hide buttons
