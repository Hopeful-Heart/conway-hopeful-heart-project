import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import moment from "moment";

import AddEventForm from "./AddEventForm";

import "./EventsPage.css";

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function EventsPage() {
  const events = useSelector((store) => store.events.approvedEventsListReducer);
  const fullCalendarEvents = [];

  const createFullCalendarEvents = () => {
    events.map((event) =>
      fullCalendarEvents.push({
        title: event.name,
        date: moment(event.date).format("YYYY-MM-DD"),
      })
    );
  };

  events.length > 0 && createFullCalendarEvents();

  return (
    <div className="container">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={fullCalendarEvents}
      />
      <br />
      <br />
      <AddEventForm />
    </div>
  );
}

export default EventsPage;
