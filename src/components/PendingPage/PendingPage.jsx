import { useDispatch } from "react-redux";
import { useState } from "react";

import { Paper, makeStyles, ButtonGroup, Button } from "@material-ui/core";

import Logo from "../LandingPage/Logo_Primary.png";

function PendingPages() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const dispatch = useDispatch();
  const [pendingMessageToggle, setPendingMessageToggle] = useState(false);

  const useStyles = makeStyles({
    paper: {
      margin: "auto",
      marginTop: "1rem",
      marginBottom: "1rem",
      width: "fit-content",
      padding: "2rem",
      textAlign: "center",
    },
  });

  const classes = useStyles();

  return (
    <div className="container">
      <Paper className={classes.paper}>
        <img src={Logo} style={{ width: "20rem" }} />
        <br />
        <br />
        <h2 style={{ fontSize: "2rem", marginTop: ".5rem" }}>
          Thank you for registering!
        </h2>
        <p style={{ fontSize: "1.5rem", maxWidth: "40rem" }}>
          Your Account is Pending Acceptance
        </p>
        {pendingMessageToggle && (
          <p style={{ fontSize: "1.5rem", maxWidth: "40rem" }}>
            To keep Family Connections safe and secure, we have our admins vet
            every account that is created. Thank you for your patience.
          </p>
        )}
        <ButtonGroup>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => dispatch({ type: "LOGOUT" })}
          >
            Log out
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setPendingMessageToggle(true)}
          >
            Why?
          </Button>
        </ButtonGroup>
      </Paper>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default PendingPages;
