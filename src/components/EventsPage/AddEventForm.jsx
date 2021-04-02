import { useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

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
  });

  const eventTypes = [
    { value: "nd", name: "North Dakota" },
    { value: "ne", name: "Nebraska" },
    { value: "virtual", name: "Virtual" },
  ];

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
        <h2 style={{ fontSize: "2rem", marginTop: 0 }}>Add Event</h2>
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
            value={newEvent.type}
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
            label="Memorial Date"
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
    // <form
    //   onReset={handleAddEventReset}
    //   onSubmit={handleAddEventSubmit}
    //   style={{ textAlign: "center" }}
    // >
    //   <button type="button" onClick={() => addEventToggle ? setAddEventToggle(false) : setAddEventToggle(true)}>
    //     Add Event
    //   </button>
    //   {addEventToggle && (
    //     <div>
    //       <br />
    //       <label htmlFor="add-event-name">Name: </label>
    //       <input
    //         required
    //         type="text"
    //         id="add-event-name"
    //         value={newEvent.name}
    //         onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
    //       />
    //       <br />
    //       <label htmlFor="add-event-date">Date: </label>
    //       <input
    //         required
    //         type="date"
    //         id="add-event-date"
    //         value={newEvent.date}
    //         onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
    //       />
    //       <br />
    //       <label htmlFor="add-event-location">Location: </label>
    //       <input
    //         required
    //         type="text"
    //         id="add-event-location"
    //         value={newEvent.location}
    //         onChange={(e) =>
    //           setNewEvent({ ...newEvent, location: e.target.value })
    //         }
    //       />
    //       <br />
    //       <label htmlFor="add-event-type">Type: </label>
    //       <select
    //         required
    //         id="add-event-type"
    //         value={newEvent.type}
    //         onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
    //       >
    //         <option value="ND">ND</option>
    //         <option value="NE">NE</option>
    //         <option value="Virtual">Virtual</option>
    //         <option value="User">User</option>
    //       </select>
    //       <br />
    //       <label htmlFor="add-event-link">Link: </label>
    //       <input
    //         required
    //         type="url"
    //         id="add-event-link"
    //         value={newEvent.link}
    //         onChange={(e) => setNewEvent({ ...newEvent, link: e.target.value })}
    //       />
    //       <br />
    //       <label htmlFor="add-event-description">Description: </label>
    //       <textarea
    //         required
    //         id="add-event-location"
    //         value={newEvent.description}
    //         onChange={(e) =>
    //           setNewEvent({ ...newEvent, description: e.target.value })
    //         }
    //       />
    //       <br />
    //       <button type="reset">Cancel</button>
    //       <button type="submit">Submit</button>
    //     </div>
    //   )}
    // </form>
  );
}

export default addEventForm;
