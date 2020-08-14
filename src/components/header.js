import React, { useState } from "react";
import {
  Link,
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import ReactDOM from "react-dom";
import { storeCurrentUser, clearCurrentUser } from "../Auth";
import Modal from "react-modal";
import { Register, Login } from "./index";

import "./Header.css";

Modal.setAppElement("#root");
const Header = ({ currentUser, setCurrentUser }) => {
  const [selectedUser, setSelectedUser] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalRegisterIsOpen, setRegisterModalIsOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleUserLogin = (event) => {
    storeCurrentUser(selectedUser);
    setCurrentUser(selectedUser);
  };

  // do i need to move handleUserLogin into the login component
  // so that i can store it in localstorage

  const handleUserLogout = (event) => {
    clearCurrentUser();
  };

  // how should i change or remove some of these states

  return (
    <div id="header">
      <header>
        <button onClick={() => setModalIsOpen(true)}>Login</button>
        <Modal isOpen={modalIsOpen}>
          <Login toggleModal={setModalIsOpen}></Login>
        </Modal>
        <button onClick={() => setRegisterModalIsOpen(true)}>Register</button>
        <Modal isOpen={modalRegisterIsOpen}>
          <Register toggleModal={setRegisterModalIsOpen}></Register>
        </Modal>
        <button onClick={handleUserLogout}>Logout {currentUser}</button>
      </header>
    </div>
  );
};
export default Header;
