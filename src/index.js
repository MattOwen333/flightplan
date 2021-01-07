import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Grid } from "@material-ui/core";
import { Container } from "@material-ui/core/Container";
import { Link, BrowserRouter as Router } from "react-router-dom";
import { getSomething } from "./api";
import { Grouplist, Groupview, Header, Divider } from "./components";

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
    <Grid container direction="column" spacing={5}>
      <Grid item>
        <Header />
      </Grid>
      <Grid item container>
        <Grid item xs={false} sm={2} />
        <Grid item xs={12} sm={8} xl={4}>
          <Groupview />
        </Grid>
        <Grid item xs={false} sm={2} />
      </Grid>
      {/* need to write a ternary here to display only if a user is logged in  */}
      <Grid item>
        <Divider />
      </Grid>
      <Grid item container>
        <Grid item xs={false} sm={2} />
        <Grid item xs={12} sm={8} xl={4}>
          {/* <Grouplist /> */}
          <Groupview />
        </Grid>
        <Grid item xs={false} sm={2} />
      </Grid>
    </Grid>
  );
};

ReactDOM.render(
  <App />,

  document.getElementById("root")
);
