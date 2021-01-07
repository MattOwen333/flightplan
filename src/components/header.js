import { useState, useEffect } from "react";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import { getCurrentUser, storeCurrentUser, clearCurrentUser } from "../Auth";
import Modal from "react-modal";
import { Register, Login } from ".";
import { Grid } from "@material-ui/core";

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
Modal.setAppElement("#root");
const Header = ({ currentUser, setCurrentUser }) => {
  const classes = useStyles();
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
            <Grid item xs={9}></Grid>
            <Grid item>
              <Button color="inherit" onClick={() => setModalIsOpen(true)}>
                Login
              </Button>
              <Modal isOpen={modalIsOpen}>
                <Login toggleModal={setModalIsOpen}></Login>
              </Modal>
            </Grid>
            <Grid item>
              <Button
                color="inherit"
                onClick={() => setRegisterModalIsOpen(true)}
              >
                Register
              </Button>
              <Modal isOpen={modalRegisterIsOpen}>
                <Register toggleModal={setRegisterModalIsOpen}></Register>
              </Modal>
            </Grid>
            {isLoggedIn ? null : (
              <Button onClick={handleUserLogout}>Logout {currentUser}</Button>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
