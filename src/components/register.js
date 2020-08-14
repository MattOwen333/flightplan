import { register } from "../Auth";
import React, { useState } from "react";

import Modal from "react-modal";

// const { createUser } = require("../db");
const Register = ({ toggleModal }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleEmailChnage = (event) => {
    setEmail(event.target.value);
  };
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };
  async function handleSubmit(event) {
    event.preventDefault();
    const token = await register({
      username,
      password,
      name,
      email,
      location,
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
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={handleNameChange}
        />
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={handleEmailChnage}
        />
        <input
          type="text"
          placeholder="location"
          value={location}
          onChange={handleLocationChange}
        />
        <button>Register</button>
      </form>
    </div>
  );
};
export default Register;
