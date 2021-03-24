import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import moment from "moment";

import AddEventForm from "./AddEventForm";

import "./EventsPage.css";

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function EventsPage() {
  const dispatch = useDispatch();
  const events = useSelector((store) => store.events);

  useEffect(() => {
    dispatch({ type: "FETCH_CALENDAR_EVENTS" });
  }, []);

  return (
    <div className="container">
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        events={() => {
          const eventsArr = [];

          events.eventsListReducer.map(event => {
            eventsArr.push({ title: event.name, date: moment(event.date).format('YYYY-MM-DD') });
          });

          console.log(eventsArr)

          return eventsArr;
        }}
      />
      <br />
      <br />
      <AddEventForm />
    </div>
  );
}

export default EventsPage;
