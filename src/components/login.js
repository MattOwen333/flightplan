import React, { useState } from "react";
import Modal from "react-modal";
import { storeCurrentUser, setCurrentUser, login } from "../Auth";
const Login = ({ toggleModal, setCurrentUser, setModalIsOpen }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleUserLogin = (token) => {
    storeCurrentUser(token);
    setCurrentUser(token);
  };
  async function handleSubmit(event) {
    event.preventDefault();
    const token = await login({
      username,
      password,
    });
    localStorage.setItem("token", token);
    console.log(token);
    toggleModal(false);
  }
  return (
    <div id="Login">
      <h3>Login</h3>
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
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};
// need to figure out how to display current user
export default Login;
