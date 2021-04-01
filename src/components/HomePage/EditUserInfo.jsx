import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactFilestack from "react-filestack";

import {
  Paper,
  makeStyles,
  Button,
  ButtonGroup,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

function EditUserInfo({ setParentEditScreen, setHomeDefaultView }) {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const states = useSelector((store) => store.states.statesReducer);
  const [editUserInfo, setEditUserInfo] = useState({
    email: user.email,
    firstName: user.first_name,
    lastName: user.last_name,
    phone: user.phone,
    city: user.city,
    state: user.state,
    pic: user.profile_pic,
  });

  const basicOptions = {
    accept: ["image/*"],
    maxFiles: 1,
  };

  const api_key = process.env.REACT_APP_FILESTACK_API_KEY;

  const onSuccess = (result) => {
    console.log("Result from filestack success: ", result);
    setEditUserInfo({ ...editUserInfo, pic: result.filesUploaded[0].url });
  };

  const onError = (error) => {
    alert("Error Uploading" + error);
    console.error("error", error);
  };

  const saveParent = (e) => {
    e.preventDefault();

    setParentEditScreen(false);
    setHomeDefaultView(true);

    dispatch({
      type: "UPDATE_PARENT_INFO",
      payload: editUserInfo,
    });
  };

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
    <div className="container">
      <Paper className={classes.paper}>
        <form
          onReset={() => {
            setParentEditScreen(false);
            setHomeDefaultView(true);
          }}
          onSubmit={saveParent}
        >
          <h2 style={{ fontSize: "2rem", marginTop: 0 }}>Edit User Info</h2>
          <div>
            <div>
              <h2>Account Info</h2>
              <img
                src={editUserInfo.pic}
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
              <ReactFilestack
                apikey={api_key}
                buttonText="UPLOAD A PROFILE PICTURE (OPTIONAL)"
                pickerOptions={basicOptions}
                onSuccess={onSuccess}
                onError={onError}
                buttonClass="filestack-button"
              />
              <br />
              <br />
              <TextField
                type="email"
                variant="outlined"
                label="Email"
                size="small"
                helperText="Warning: changing this will change your login info!"
                value={editUserInfo.email}
                required
                onChange={(event) =>
                  setEditUserInfo({
                    ...editUserInfo,
                    email: event.target.value,
                  })
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
                value={editUserInfo.firstName}
                required
                onChange={(event) =>
                  setEditUserInfo({
                    ...editUserInfo,
                    firstName: event.target.value,
                  })
                }
              />
              <TextField
                className={classes.registerInputSpaceLeft}
                type="text"
                variant="outlined"
                label="Last Name"
                size="small"
                value={editUserInfo.lastName}
                required
                onChange={(event) =>
                  setEditUserInfo({
                    ...editUserInfo,
                    lastName: event.target.value,
                  })
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
                value={editUserInfo.phone}
                required
                onChange={(event) =>
                  setEditUserInfo({
                    ...editUserInfo,
                    phone: event.target.value,
                  })
                }
              />
              <br />
              <br />
              <TextField
                type="text"
                variant="outlined"
                label="City (Optional)"
                size="small"
                value={editUserInfo.city}
                onChange={(event) =>
                  setEditUserInfo({ ...editUserInfo, city: event.target.value })
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
                  value={editUserInfo.state}
                  onChange={(event) =>
                    setEditUserInfo({
                      ...editUserInfo,
                      state: event.target.value,
                    })
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
            </div>
          </div>
          <br />
          <br />
          <ButtonGroup>
            <Button variant="outlined" color="primary" type="reset">
              Back
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </ButtonGroup>
        </form>
      </Paper>
    </div>
  );
}

export default EditUserInfo;
