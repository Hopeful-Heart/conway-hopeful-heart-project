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

function RegisterForm() {
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    state: "",
    pic: "",
  });

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: "REGISTER",
      payload: newUser,
    });
  }; // end registerUser

  const useStyles = makeStyles({
    paper: {
      margin: "auto",
      marginTop: "1rem",
      marginBottom: "1rem",
      width: "fit-content",
      padding: "2rem",
      textAlign: "center",
    },
    registerInputSpaceLeft: {
      marginLeft: "1rem",
    },
  });

  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <img src={Logo} style={{ width: "15rem" }} />
      <form onReset={() => history.push("/landing")} onSubmit={registerUser}>
        <h2 style={{ fontSize: "2rem", marginTop: ".5rem" }}>Register User</h2>
        {errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {errors.registrationMessage}
          </h3>
        )}
        <div>
          <div style={{ marginRight: "1rem" }}>
            <h2>Account Info</h2>
            <TextField
              type="email"
              variant="outlined"
              label="Email"
              size="small"
              value={newUser.email}
              required
              onChange={(event) =>
                setNewUser({ ...newUser, email: event.target.value })
              }
            />
            <br />
            <br />
            <TextField
              type="password"
              variant="outlined"
              label="Password"
              size="small"
              value={newUser.password}
              required
              onChange={(event) =>
                setNewUser({ ...newUser, password: event.target.value })
              }
            />
            <br />
            <br />
            <TextField
              type="text"
              variant="outlined"
              label="Profile Pic"
              size="small"
              value={newUser.pic}
              required
              onChange={(event) =>
                setNewUser({ ...newUser, pic: event.target.value })
              }
            />
          </div>
          <br />
          <div>
            <h2>User Info</h2>
            <TextField
              type="text"
              variant="outlined"
              label="First Name"
              size="small"
              value={newUser.firstName}
              required
              onChange={(event) =>
                setNewUser({ ...newUser, firstName: event.target.value })
              }
            />
            <TextField
              className={classes.registerInputSpaceLeft}
              type="text"
              variant="outlined"
              label="Last Name"
              size="small"
              value={newUser.lastName}
              required
              onChange={(event) =>
                setNewUser({ ...newUser, lastName: event.target.value })
              }
            />
            <br />
            <br />
            <TextField
              type="text"
              variant="outlined"
              label="City (Optional)"
              size="small"
              value={newUser.city}
              onChange={(event) =>
                setNewUser({ ...newUser, city: event.target.value })
              }
            />
            <TextField
              className={classes.registerInputSpaceLeft}
              type="text"
              variant="outlined"
              label="State"
              size="small"
              value={newUser.state}
              required
              onChange={(event) =>
                setNewUser({ ...newUser, state: event.target.value })
              }
            />
            <br />
            <br />
            <TextField
              type="text"
              variant="outlined"
              label="Phone Number"
              size="small"
              helperText="E.g. 701-555-5555"
              value={newUser.phone}
              required
              onChange={(event) => setNewUser({ ...newUser, phone: event })}
            />
          </div>
        </div>
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

export default RegisterForm;
