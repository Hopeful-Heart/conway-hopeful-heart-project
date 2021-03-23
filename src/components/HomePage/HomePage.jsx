import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

function HomePage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const [entry, setEntry] = useState('');
  const [parentEditScreen, setParentEditScreen] = useState(false);
  const [childEditScreen, setchildEditScreen] = useState(false);
  const [img, setImg] = useState(`${user.profile_pic}`);
  const [childImg, setChildImg] = useState(`${user.second_photo}`);
  const [firstName, setFirstName] = useState(`${user.first_name}`);
  const [lastName, setLastName] = useState(`${user.last_name}`);
  const [childFirstName, setChildFirstName] = useState(`${user.child_first_name}`);
  const [childLastName, setChildLastName] = useState(`${user.child_last_name}`);
  const [state, setState] = useState(`${user.state}`);
  const [city, setCity] = useState(`${user.state}`);
  const [phone, setPhone] = useState(`${user.phone}`);
  const [email, setEmail] = useState(`${user.email}`);
  const [bday, setBday] = useState(`${user.birthday}`);
  const [story, setStory] = useState(`${user.story}`);
  const [sentiment, setSentiment] = useState(`${user.special_sentiment}`);
  const [memDay, setMemDay] = useState(`${user.memorial_date}`);
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
    setParentEditScreen(true);
  }

  const editChild = () => {
    setchildEditScreen(true);
  }

  const saveParent = () => {
    setParentEditScreen(false);

    dispatch({
      type: "UPDATE_PARENT_INFO",
      payload: {
        firstName: firstName,
        lastName: lastName,
        img: img,
        state: state,
        city: city,
        phone: phone,
        email: email,
        id: user.id,
      }
    })
  }

  const saveChild = () => {
    setchildEditScreen(false);

    if (childFirstName === null) {
      setChildFirstName('');
    }
    if (childLastName === null) {
      setChildLastName('');
    }
    if (childImg === null) {
      setChildImg('');
    }
    if (bday === null || bday === undefined) {
      setBday('000-00-00T00:00:00.000Z');
    }
    if (memDay === null || memDay === undefined) {
      setMemDay('000-00-00T00:00:00.000Z');
    }
    if (story === null) {
      setStory('');
    }
    if (sentiment === null || sentiment === undefined) {
      setSentiment('');
    }

    dispatch({
      type: "UPDATE_CHILD_INFO",
      payload: {
        firstName: childFirstName,
        lastName: childLastName,
        img: childImg,
        birthday: bday,
        memorial_day: memDay,
        story: story,
        id: user.id,
        sentiment: sentiment,
      }
    })
  }

  return (
    <div className="container">
      <div className="col">
        <div className="row">
          {
          parentEditScreen 
          ?
          <>
            <div className="parent-info-container">
              <div className="parent-info-col">
                <input
                  type="text"
                  placeholder="Image URL"
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
                    placeholder="City"
                    value={city}
                    onChange={(e) => { setCity(e.target.value) }}
                  />
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
            {
            childEditScreen
            ?
            <>
              <div className="child-info-col">
                    <p>Child's Picture</p>
                    <input
                      type="text"
                      placeholder="Image URL"
                      value={childImg}
                      onChange={(e) => { setChildImg(e.target.value) }}
                    />
              </div>
              <div className="child-info-col">
                <div className="child-info-row">
                      <p>Child's First Name</p>
                      <input
                        type="text"
                        placeholder="Child's First Name"
                        value={childFirstName}
                        onChange={(e) => { setChildFirstName(e.target.value) }}
                      />
                      <p>Child's Last Name</p>
                      <input
                        type="text"
                        placeholder="Child's Last Name"
                        value={childLastName}
                        onChange={(e) => { setChildLastName(e.target.value) }}
                      />
                </div>
                <div className="child-info-row">
                      <p>Child's Birthdate</p>
                      <input
                        type="date"
                        placeholder="Child's Birthdate"
                        value={bday}
                        onChange={(e) => { setBday(e.target.value) }}
                      />
                      <p>Child's Memorial Date</p>
                      <input
                        type="date"
                        placeholder="Child's Memorial Day"
                        value={memDay}
                        onChange={(e) => { setMemDay(e.target.value) }}
                      />
                </div>
              </div>
              <div className="child-story">
                    <p>Story</p>
                    <input
                      type="text"
                      placeholder="Story"
                      value={story}
                      onChange={(e) => { setStory(e.target.value) }}
                    />
                    <p>Child's Special Setiment</p>
                    <input
                      type="text"
                      placeholder="Special Sentiment"
                      value={sentiment}
                      onChange={(e) => { setSentiment(e.target.value) }}
                    />
                    <br />
                <button onClick={saveChild}>Save</button>
              </div>
            </>
            :
            <>
            <div className="child-info-col">
              <img src={user.second_photo} />
            </div>
            <div className="child-info-col">
              <div className="child-info-row">
                <h3>Remembering <br />{user.child_first_name} {user.child_last_name}</h3>
              </div>
              <div className="child-info-row">
                <h5>{user.birthday} - {user.memorial_day}</h5>
              </div>
            </div>
          <div className="child-story">
            <h2>Story</h2>
            <p>{user.story}</p>
            <button onClick={editChild}>Edit Child Info</button>
          </div>
          </>
          }
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
