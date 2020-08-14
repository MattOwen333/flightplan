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
    // fitness trac.kr
    // first route index in routes file
    // pull user out of the token and store it in request
    // make a route that passes in a token and verifys is valid and
    // returns the user
    //   let currentUser = {
    //     username: `${username}`,
    //     token: `${token}`,
    //   };
    //   // localStorage.setItem("currentUser", currentUser);
    //   // console.log("CURRENT USER:", currentUser);
    //   console.log(user.id);
    //   res.send({ message: `Hello, ${username}`, token });
    // } else {
    //   next({
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
        <button>Login</button>
      </form>
    </div>
  );
};
// need to figure out how to display current user
export default Login;
