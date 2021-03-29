import Calendar from "react-calendar";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import moment from "moment";

import { Popover } from "@material-ui/core";

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
  const [anchorElement, setAnchorElement] = useState(null);
  const [popoverEvent, setPopoverEvent] = useState({});

  const open = Boolean(anchorElement);

  useEffect(() => {
    dispatch({ type: "FETCH_APPROVED_EVENTS" });
  }, []);

  return (
    <div className="container">
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
        <div id="popover-content">
          <h3>{popoverEvent.name}</h3>
          <p>Date: {moment(popoverEvent.date).format('MM-DD-YYYY')}</p>
          <p>Location: {popoverEvent.location}</p>
          <p>Event Type: {popoverEvent.type}</p>
          <p>Description: {popoverEvent.description}</p>
          <a href={popoverEvent.link}>Link to Event</a>
        </div>
      </Popover>
      <Calendar
        calendarType="US"
        minDetail="month"
        tileContent={({ activeStartDate, date, view }) =>
          events.map((event) =>
            view === "month" &&
            moment(date).format("YYYY-MM-DD") ===
              moment(event.date).format("YYYY-MM-DD") ? (
              <p
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
      <br />
      <br />
      <AddEventForm />
    </div>
  );
}

export default EventsPage;
