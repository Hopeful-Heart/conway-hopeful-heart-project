import { useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import ReactFilestack from "react-filestack";

import {
  Paper,
  Button,
  ButtonGroup,
  makeStyles,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

function addEventForm({ setAddEventToggle, setEventsDefaultView }) {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [newEvent, setNewEvent] = useState({
    name: "",
    date: `${moment().format()}`,
    location: "",
    description: "",
    type: "user",
    link: "",
    picture: "https://cdn.filestackcontent.com/pLNYHuIqSVeXHykZEhWY",
  });

  const eventTypes = [
    { value: "nd", name: "North Dakota" },
    { value: "ne", name: "Nebraska" },
    { value: "virtual", name: "Virtual" },
  ];

  const basicOptions = {
    accept: ["image/*"],
    maxFiles: 1,
  };

  const api_key = process.env.REACT_APP_FILESTACK_API_KEY;

  const onSuccess = (result) => {
    setNewEvent({ ...newEvent, picture: result.filesUploaded[0].url });
  };

  const onError = (error) => {
    alert("Error Uploading" + error);
    console.error("error", error);
  };

  const handleAddEventReset = () => {
    setEventsDefaultView(true);
    setAddEventToggle(false);
  };

  const handleAddEventSubmit = (e) => {
    e.preventDefault();

    setEventsDefaultView(true);
    setAddEventToggle(false);

    dispatch({ type: "ADD_EVENT", payload: newEvent });
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
    formControl: { minWidth: 120 },
  });

  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <form onReset={handleAddEventReset} onSubmit={handleAddEventSubmit}>
        <h2 style={{ fontSize: "2rem", margin: 0 }}>Add Event</h2>
        <br />
        <img
          src={newEvent.picture}
          style={{
            width: "30rem",
            maxHeight: "15rem",
            objectFit: "cover",
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
        <br />
        <br />
        <TextField
          required
          type="text"
          variant="outlined"
          label="Name"
          value={newEvent.name}
          onChange={(event) =>
            setNewEvent({
              ...newEvent,
              name: event.target.value,
            })
          }
        />
        <TextField
          className={classes.registerInputSpaceLeft}
          type="text"
          variant="outlined"
          label="Location (Optional)"
          value={newEvent.location}
          onChange={(event) =>
            setNewEvent({
              ...newEvent,
              location: event.target.value,
            })
          }
        />
        <br />
        <br />
        <FormControl
          variant="outlined"
          className={classes.formControl}
          required
        >
          <InputLabel id="event-select-event-type-label">Event Type</InputLabel>
          <Select
            labelId="event-select-event-type-label"
            defaultValue="user"
            onChange={(event) =>
              setNewEvent({
                ...newEvent,
                type: event.target.value,
              })
            }
            label="Event Type"
            required
          >
            {user.admin_user &&
              eventTypes.map((eventType) => (
                <MenuItem key={eventType.value} value={eventType.value}>
                  {eventType.name}
                </MenuItem>
              ))}
            <MenuItem value="user">User</MenuItem>
          </Select>
        </FormControl>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <KeyboardDatePicker
            required
            className={classes.registerInputSpaceLeft}
            variant="inline"
            format="MM-DD-YYYY"
            label="Event Date"
            value={moment(newEvent.date).format()}
            onChange={(date) =>
              setNewEvent({
                ...newEvent,
                date: moment(date).format(),
              })
            }
          />
        </MuiPickersUtilsProvider>
        <br />
        <br />
        <TextField
          type="url"
          variant="outlined"
          label="Link to Event"
          value={newEvent.link}
          onChange={(event) =>
            setNewEvent({
              ...newEvent,
              link: event.target.value,
            })
          }
        />
        <br />
        <br />
        <TextField
          multiline
          rows={6}
          label="Description"
          variant="outlined"
          className={classes.multiline}
          value={newEvent.description}
          onChange={(e) =>
            setNewEvent({ ...newEvent, description: e.target.value })
          }
        />
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
  );
}

export default addEventForm;
