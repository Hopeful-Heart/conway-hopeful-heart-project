import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  Paper,
  makeStyles,
  TextField,
  Button,
  ButtonGroup,
} from "@material-ui/core";

import Logo from "../LandingPage/Logo_Primary.png";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const login = (event) => {
    event.preventDefault();

    if (email && password) {
      dispatch({
        type: "LOGIN",
        payload: {
          email: email,
          password: password,
        },
      });
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

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
    <Paper className={classes.paper}>
      <img src={Logo} style={{ width: "15rem" }} />
      <form onReset={() => history.push("/landing")} onSubmit={login}>
        <h2 style={{ fontSize: "2rem", marginTop: ".5rem" }}>Login</h2>
        {errors.loginMessage && (
          <h3 className="alert" role="alert">
            {errors.loginMessage}
          </h3>
        )}
        <TextField
          type="email"
          variant="outlined"
          label="Email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <br />
        <br />
        <TextField
          type="password"
          variant="outlined"
          label="Password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        <br />
        <ButtonGroup>
          <Button variant="outlined" color="primary" type="reset">
            Back to Home
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </ButtonGroup>
      </form>
    </Paper>
  );
}

export default LoginForm;
