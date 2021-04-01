import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactFilestack from "react-filestack";
import moment from "moment";

import {
  Paper,
  makeStyles,
  Button,
  ButtonGroup,
  TextField,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

function MemorialForm({
  setMemorialFormToggle,
  setHomeDefaultView,
  editMemorialToggle,
  setEditMemorialToggle,
}) {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [memorialInfo, setMemorialInfo] = useState(
    user.memorial
      ? {
          firstName: user.child_first_name,
          lastName: user.child_last_name,
          birtday: user.birtday,
          memorialDay: user.memorial_day,
          story: user.story,
          pic: user.second_photo,
        }
      : {
          firstName: "",
          lastName: "",
          birthday: moment().format(),
          memorialDay: moment().format(),
          story: "",
          pic:
            "https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg",
        }
  );

  const saveMemorial = (e) => {
    e.preventDefault();

    setMemorialFormToggle(false);
    setHomeDefaultView(true);

    if (editMemorialToggle) {
      setEditMemorialToggle(false);
    };

    dispatch({
      type: "UPDATE_CHILD_INFO",
      payload: memorialInfo,
    });
  };

  const basicOptions = {
    accept: ["image/*"],
    maxFiles: 1,
  };

  const api_key = process.env.REACT_APP_FILESTACK_API_KEY;

  const onSuccess = (result) => {
    console.log("Result from filestack success: ", result);
    setMemorialInfo({ ...memorialInfo, pic: result.filesUploaded[0].url });
  };

  const onError = (error) => {
    alert("Error Uploading" + error);
    console.error("error", error);
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
    multiline: {
      minWidth: "20rem",
    },
  });

  const classes = useStyles();

  return (
    <div className="container">
      <Paper className={classes.paper}>
        <form
          onReset={() => {
            setMemorialFormToggle(false);
            editMemorialToggle && setEditMemorialToggle(false);
            setHomeDefaultView(true);
          }}
          onSubmit={saveMemorial}
        >
          <h2 style={{ fontSize: "2rem", marginTop: 0 }}>
            {editMemorialToggle ? "Edit Memorial" : "Add a Memorial"}
          </h2>
          <div>
            <div>
              <img
                src={memorialInfo.pic}
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
                buttonText="UPLOAD A PICTURE (OPTIONAL)"
                pickerOptions={basicOptions}
                onSuccess={onSuccess}
                onError={onError}
                buttonClass="filestack-button"
              />
            </div>
            <br />
            <div>
              <TextField
                type="text"
                variant="outlined"
                label="First Name"
                value={memorialInfo.firstName}
                onChange={(event) =>
                  setMemorialInfo({
                    ...memorialInfo,
                    firstName: event.target.value,
                  })
                }
              />
              <TextField
                className={classes.registerInputSpaceLeft}
                type="text"
                variant="outlined"
                label="Last Name"
                value={memorialInfo.lastName}
                onChange={(event) =>
                  setMemorialInfo({
                    ...memorialInfo,
                    lastName: event.target.value,
                  })
                }
              />
              <br />
              <br />
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  disableFuture
                  variant="inline"
                  format="MM-DD-YYYY"
                  label="Birth Date"
                  value={moment(memorialInfo.birthday).format()}
                  onChange={(date) =>
                    setMemorialInfo({
                      ...memorialInfo,
                      birthday: moment(date).format(),
                    })
                  }
                />
              </MuiPickersUtilsProvider>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  className={classes.registerInputSpaceLeft}
                  disableFuture
                  variant="inline"
                  format="MM-DD-YYYY"
                  label="Memorial Date"
                  value={moment(memorialInfo.memorialDay).format()}
                  onChange={(date) =>
                    setMemorialInfo({
                      ...memorialInfo,
                      memorialDay: moment(date).format(),
                    })
                  }
                />
              </MuiPickersUtilsProvider>
              <br />
              <br />
              <TextField
                multiline
                rows={6}
                label="Story"
                variant="outlined"
                className={classes.multiline}
                value={memorialInfo.story}
                onChange={(e) =>
                  setMemorialInfo({ ...memorialInfo, story: e.target.value })
                }
              />
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

export default MemorialForm;
