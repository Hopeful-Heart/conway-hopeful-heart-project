import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

import { Paper, makeStyles } from "@material-ui/core";

import Logo from "../LandingPage/Logo_Primary.png";

function PendingPages() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const dispatch = useDispatch();

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
      </Paper>
      <br />
      <button
        onClick={() =>
          dispatch({ type: "UPDATE_AUTHORIZED_USER", payload: true })
        }
      >
        Authorize Account
      </button>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default PendingPages;
