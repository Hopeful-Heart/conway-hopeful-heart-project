import Calendar from "react-calendar";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import moment from "moment";

import {
  Popover,
  makeStyles,
  Paper,
  Button,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
} from "@material-ui/core";

import AddEventForm from "./AddEventForm";

import "./EventsPage.css";
import "react-calendar/dist/Calendar.css";

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function EventsPage() {
  const events = useSelector((store) => store.events.approvedEventsListReducer);
  const dispatch = useDispatch();
  const [eventsDefaultView, setEventsDefaultView] = useState(true);
  const [addEventToggle, setAddEventToggle] = useState(false);
  const [anchorElement, setAnchorElement] = useState(null);
  const [popoverEvent, setPopoverEvent] = useState({});

  const open = Boolean(anchorElement);

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
      marginTop: 7,
    },
    formControl: { minWidth: 160 },
  });

  const classes = useStyles();

  useEffect(() => {
    dispatch({ type: "FETCH_APPROVED_EVENTS", payload: "all" });
  }, []);

  return (
    <div className="container">
      {eventsDefaultView && (
        <>
          <Popover
            open={open}
            anchorEl={anchorElement}
            onClose={() => setAnchorElement(null)}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          >
            <div className="popover-content">
              <h3>{popoverEvent.name}</h3>
              <p>Date: {moment(popoverEvent.date).format("MM-DD-YYYY")}</p>
              <p>Location: {popoverEvent.location}</p>
              <p>Event Type: {popoverEvent.type}</p>
              <p>Description: {popoverEvent.description}</p>
              <a href={popoverEvent.link}>Link to Event</a>
            </div>
          </Popover>
          <Paper className={classes.paper}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "2rem",
              }}
            >
              <h1 style={{ margin: 0, fontSize: "2.5rem" }}>Events</h1>
              <div>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="event-select-event-type-sort-label">
                    Sort Events By:
                  </InputLabel>
                  <Select
                    labelId="event-select-event-type-sort-label"
                    label="Sort Events By:"
                    defaultValue="all"
                    onChange={(e) =>
                      dispatch({
                        type: "FETCH_APPROVED_EVENTS",
                        payload: e.target.value,
                      })
                    }
                  >
                    <MenuItem value={"all"}>All Events</MenuItem>
                    <MenuItem value={"nd"}>North Dakota</MenuItem>
                    <MenuItem value={"ne"}>Nebraska</MenuItem>
                    <MenuItem value={"virtual"}>Virtual</MenuItem>
                    <MenuItem value={"user"}>User Created</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  className={classes.registerInputSpaceLeft}
                  size="large"
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    setEventsDefaultView(false);
                    setAddEventToggle(true);
                  }}
                >
                  Add Event
                </Button>
              </div>
            </div>
            <Calendar
              calendarType="US"
              minDetail="month"
              tileContent={({ activeStartDate, date, view }) =>
                events.map((event) =>
                  view === "month" &&
                  moment(date).format("YYYY-MM-DD") ===
                    moment(event.date).format("YYYY-MM-DD") ? (
                    <p
                      className={`${event.type}-event`}
                      key={event.id}
                      onClick={(e) => {
                        setAnchorElement(e.target);
                        setPopoverEvent(event);
                      }}
                    >
                      {event.name}
                    </p>
                  ) : null
                )
              }
            />
          </Paper>
        </>
      )}
      {addEventToggle && (
        <AddEventForm
          setAddEventToggle={setAddEventToggle}
          setEventsDefaultView={setEventsDefaultView}
        />
      )}
    </div>
  );
}

export default EventsPage;
