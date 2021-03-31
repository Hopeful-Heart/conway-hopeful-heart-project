import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ReactFilestack from "react-filestack";

import {
  Paper,
  makeStyles,
  TextField,
  Button,
  ButtonGroup,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
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
    pic: 'https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg',
  });

  const basicOptions = {
    accept: ["image/*"],
    imageDim: [1000, null],
    maxFiles: 1,
  };

  const api_key = process.env.REACT_APP_FILESTACK_API_KEY;

  const onSuccess = (result) => {
    console.log("Result from filestack success: ", result);
    setNewUser({ ...newUser, pic: result.filesUploaded[0].url });
  };

  const onError = (error) => {
    alert("Error Uploading" + error);
    console.error("error", error);
  };

  const states = useSelector((store) => store.states.statesReducer);
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

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
    formControl: { minWidth: 120 },
  });

  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <img src={Logo} style={{ width: "20rem" }} />
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
            <img
              src={newUser.pic}
              style={{
                height: 250,
                width: 250,
                objectFit: "cover",
                borderRadius: "50%",
                border: "solid gray 1px",
              }}
            />
            <br />
            <br />
            <Button
              variant="contained"
              color="primary"
              component={ReactFilestack}
              apikey={api_key}
              pickerOptions={basicOptions}
              onSuccess={onSuccess}
              onError={onError}
            >
              Upload a Profile Picture (Optional)
            </Button>
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
            <br />
            <br />
            <FormControl
              variant="outlined"
              className={classes.formControl}
              required
            >
              <InputLabel id="register-select-state-label">State</InputLabel>
              <Select
                labelId="register-select-state-label"
                id="demo-simple-select-outlined"
                value={newUser.state}
                onChange={(event) =>
                  setNewUser({ ...newUser, state: event.target.value })
                }
                label="State"
                required
              >
                {states.map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
              onChange={(event) =>
                setNewUser({ ...newUser, phone: event.target.value })
              }
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
