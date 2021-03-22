import Calendar from "react-calendar";

import AddEventForm from "./AddEventForm";

import "./EventsPage.css";
import "react-calendar/dist/Calendar.css";

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function EventsPage() {
  return (
    <div className="container">
      <Calendar calendarType="US" minDetail="month" />
      <br />
      <br />
      <AddEventForm />
    </div>
  );
}

export default EventsPage;
