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
        {<Grouplist />}
        {<Groupview />}
        {/* you'd have one component for route /groups (GroupList) */}
        {/* you'd have a different component for /groups/:id (GroupView) */}
      </Router>
    </div>
  );
};

export default App;
