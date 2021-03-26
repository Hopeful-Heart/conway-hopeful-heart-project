import { useState } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";

function addEventForm() {
  const dispatch = useDispatch();
  const [addEventToggle, setAddEventToggle] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: "",
    date: `${moment().format("YYYY-MM-DD")}`,
    location: "",
    description: "",
    type: "ND",
    link: "",
  });

  const handleAddEventReset = () => {
    setNewEvent({
      name: "",
      date: `${moment().format("YYYY-MM-DD")}`,
      location: "",
      description: "",
      type: "ND",
      link: "",
    });
    setAddEventToggle(false);
  };

  const handleAddEventSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_EVENT", payload: newEvent });
    setNewEvent({
      name: "",
      date: `${moment().format("YYYY-MM-DD")}`,
      location: "",
      description: "",
      type: "ND",
      link: "",
    });
    setAddEventToggle(false);
  };

  return (
    <form
      onReset={handleAddEventReset}
      onSubmit={handleAddEventSubmit}
      style={{ textAlign: "center" }}
    >
      <button type="button" onClick={() => addEventToggle ? setAddEventToggle(false) : setAddEventToggle(true)}>
        Add Event
      </button>
      {addEventToggle && (
        <div>
          <br />
          <label htmlFor="add-event-name">Name: </label>
          <input
            required
            type="text"
            id="add-event-name"
            value={newEvent.name}
            onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
          />
          <br />
          <label htmlFor="add-event-date">Date: </label>
          <input
            required
            type="date"
            id="add-event-date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          />
          <br />
          <label htmlFor="add-event-location">Location: </label>
          <input
            required
            type="text"
            id="add-event-location"
            value={newEvent.location}
            onChange={(e) =>
              setNewEvent({ ...newEvent, location: e.target.value })
            }
          />
          <br />
          <label htmlFor="add-event-type">Type: </label>
          <select
            required
            id="add-event-type"
            value={newEvent.type}
            onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
          >
            <option value="ND">ND</option>
            <option value="NE">NE</option>
            <option value="Virtual">Virtual</option>
            <option value="User">User</option>
          </select>
          <br />
          <label htmlFor="add-event-link">Link: </label>
          <input
            required
            type="url"
            id="add-event-link"
            value={newEvent.link}
            onChange={(e) => setNewEvent({ ...newEvent, link: e.target.value })}
          />
          <br />
          <label htmlFor="add-event-description">Description: </label>
          <textarea
            required
            id="add-event-location"
            value={newEvent.description}
            onChange={(e) =>
              setNewEvent({ ...newEvent, description: e.target.value })
            }
          />
          <br />
          <button type="reset">Cancel</button>
          <button type="submit">Submit</button>
        </div>
      )}
    </form>
  );
}

export default addEventForm;
