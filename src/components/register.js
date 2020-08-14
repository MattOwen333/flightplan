import { register } from "../Auth";
import React, { useState } from "react";

import Modal from "react-modal";

// const { createUser } = require("../db");
const Register = ({ toggleModal }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  async function handleSubmit(event) {
    event.preventDefault();
    const token = await register({
      username,
      password,
    });
    localStorage.setItem("token", token);
    toggleModal(false);
  }
  return (
    <div id="Register">
      <h3>Register</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />

        <button>Register</button>
      </form>
    </div>
  );
};
export default Register;
