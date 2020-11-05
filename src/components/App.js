import React, { useState, useEffect } from "react";
import Header from "./Header";
import Grouplist from "./Grouplist";
import Groupview from "./Groupview";
import {
  Link,
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { getSomething } from "../api";

const isLoggedIn = localStorage.getItem("token");

const App = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    getSomething()
      .then((response) => {
        setMessage(response.message);
      })
      .catch((error) => {
        setMessage(error.message);
      });
  });

  return (
    <div className="App">
      <Router>
        <Header />
        {isLoggedIn ? <Groupview /> : <Grouplist />}
      </Router>
    </div>
  );
};

export default App;
