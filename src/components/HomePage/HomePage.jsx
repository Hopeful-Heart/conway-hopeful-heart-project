import React, {useEffect} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';

function HomePage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const events = useSelector((store) => store.events.eventsListReducer);
  const journals = useSelector((store) => store.journal.journalListReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_EVENTS" });
    dispatch({ type: "FETCH_JOURNAL", payload: user.id });
  }, [])

  let eventsList;
  let journalsList;

  if (events[0]) {
      eventsList = events.map(event =>
        (<td key={event.id}>{event.date} - {event.name}</td>)
      )
  } else {
      eventsList = <td>No Upcoming Events</td>
  }

  if (events[0]) {
    journalsList = journals.map(entry =>
        (<p key={entry.id}>{entry.content}</p>)
      )
  } else {
    journalsList = <h3>No Entries Yet</h3>
  }

  return (
    <div className="container">
      <div className="col">
        <div className="row">
          <div className="parent-info-container">
            <div className="parent-info-col">
              <img src={user.profile_pic} />
            </div>
            <div className="parent-info-col">
              <div className="parent-info-row">
                <h3>{user.first_name} {user.last_name}</h3>
              </div>
              <div className="parent-info-row">
                <h5>{user.state}</h5>
              </div>
              <div className="parent-info-row">
                <h5>{user.email}</h5>
              </div>
              <div className="parent-info-row">
                <h5>{user.phone}</h5>
              </div>
            </div>
          </div>
          <button>Edit Profile Info</button>
        </div>
        <div className="row">
          <table>
            <thead>
              <tr>
              <th>
                <h3>Upcoming Events</h3>
              </th>
              </tr>
            </thead>
            <tbody>
              <tr>
              {eventsList}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="col">
        <div className="row">
          <div className="child-info-container">
            <div className="child-info-col">
              <img src={user.profile_pic} />
            </div>
            <div className="child-info-col">
              <div className="child-info-row">
                <h3>Remembering <br />{user.child_first_name} {user.child_last_name}</h3>
              </div>
              <div className="child-info-row">
                <h5>{user.birthdate} - {user.memorial_date}</h5>
              </div>
            </div>
          <div className="child-story">
            <h2>Story</h2>
            <button>Edit Child Info</button>
            <p>{user.story}</p>
          </div>
          </div>
        </div>
        <div className="row">
          <h2>Journal</h2>
          <div className="journal-entries">
            <input type="text" placeholder="What's on your mind?"/>
            <button>Submit</button>
            {journalsList}
          </div>
        </div>
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default HomePage;
