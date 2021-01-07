import React from "react";
import { useState, useEffect } from "react";
import { getCurrentUser, storeCurrentUser, clearCurrentUser } from "../Auth";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Divider = () => {
  const classes = useStyles();
  //   useEffect(() => {
  //     let user = getCurrentUser(token);
  //   }, []);
  const user = "Bob";

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Grid container direction="row">
            <Grid item>
              <Typography>Flightplan</Typography>
            </Grid>
            <Grid item>
              <FlightTakeoffIcon />
            </Grid>

            <Typography>{user}'s Groups</Typography>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Divider;
