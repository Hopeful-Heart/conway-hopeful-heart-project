import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

function HomePage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const [entry, setEntry] = useState('');
  const [editScreen, seteditScreen] = useState(false);
  const [img, setImg] = useState(`${user.profile_pic}`);
  const [firstName, setFirstName] = useState(`${user.first_name}`);
  const [lastName, setLastName] = useState(`${user.last_name}`);
  const [state, setState] = useState(`${user.state}`);
  const [phone, setPhone] = useState(`${user.phone}`);
  const [email, setEmail] = useState(`${user.email}`);
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

  const addJournal = (event) => {
    event.preventDefault();

    dispatch({
      type: "ADD_JOURNAL",
      payload: {
        content: entry,
        id: user.id,
      }
    })

    setEntry('');
  }

  const editParent = () => {
    seteditScreen(true);
  }

  const saveParent = () => {
    seteditScreen(false);

    dispatch({
      type: "UPDATE_PARENT_INFO",
      payload: {
        firstName: firstName,
        lastName: lastName,
        img: img,
        state: state,
        phone: phone,
        email: email,
        id: user.id,
      }
    })
  }

  return (
    <div className="container">
      <div className="col">
        <div className="row">
          {
          editScreen 
          ?
          <>
            <div className="parent-info-container">
              <div className="parent-info-col">
                <input
                  type="text"
                  placeholder="image url"
                  value={img}
                  onChange={(e) => { setImg(e.target.value) }}
                />
              </div>
              <div className="parent-info-col">
                <div className="parent-info-row">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => { setFirstName(e.target.value) }}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => { setLastName(e.target.value) }}
                  />
                </div>
                <div className="parent-info-row">
                  <input
                    type="text"
                    placeholder="State"
                    value={state}
                    onChange={(e) => { setState(e.target.value) }}
                  />
                </div>
                <div className="parent-info-row">
                  <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                  />
                </div>
                <div className="parent-info-row">
                  <input
                    type="text"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value) }}
                  />
                </div>
              </div>
            </div>
            <button onClick={saveParent}>Save</button>
          </> 
          : 
          <>
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
            <button onClick={editParent}>Edit Profile Info</button>
          </>
          }
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
            <form onSubmit={addJournal}>
            <input 
            type="text" 
            placeholder="What's on your mind?"
            value={entry}
            onChange={(e) => {setEntry(e.target.value)}}
            />
            <button type="submit">Submit</button>
            </form>
            {journalsList}
          </div>
        </div>
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default HomePage;
