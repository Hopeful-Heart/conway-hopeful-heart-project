import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Popover,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
} from "@material-ui/core";

import "./HomePage.css";

import EditUserInfo from "./EditUserInfo/EditUserInfo";

function HomePage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const [entry, setEntry] = useState("");

  const [childImg, setChildImg] = useState(`${user.second_photo}`);
  const [childFirstName, setChildFirstName] = useState(
    `${user.child_first_name}`
  );
  const [childLastName, setChildLastName] = useState(`${user.child_last_name}`);
  const [bday, setBday] = useState(`${user.birthday}`);
  const [story, setStory] = useState(`${user.story}`);
  const [sentiment, setSentiment] = useState(`${user.special_sentiment}`);
  const [memDay, setMemDay] = useState(`${user.memorial_day}`);

  const events = useSelector((store) => store.events.recentEventsListReducer);
  const journals = useSelector((store) => store.journal.journalListReducer);

  const [homeDefaultView, setHomeDefaultView] = useState(true);
  const [parentEditScreen, setParentEditScreen] = useState(false);
  const [childEditScreen, setchildEditScreen] = useState(false);

  const [anchorElement, setAnchorElement] = useState(null);
  const [popoverEvent, setPopoverEvent] = useState({});

  const open = Boolean(anchorElement);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_RECENT_EVENTS" });
    dispatch({ type: "FETCH_JOURNAL", payload: user.id });
  }, []);

  const onChildSuccess = (result) => {
    console.log("Result from filestack success: ", result);
    setChildImg(result.filesUploaded[0].url);
  };

  const addJournal = (event) => {
    event.preventDefault();

    dispatch({
      type: "ADD_JOURNAL",
      payload: {
        content: entry,
        id: user.id,
      },
    });

    setEntry("");
  };

  const editChild = () => {
    setchildEditScreen(true);
  };

  const saveChild = () => {
    setchildEditScreen(false);

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
      },
    });
  };

  const useStyles = makeStyles({
    homeContentPaper: {
      margin: "auto",
      marginTop: "1rem",
      marginBottom: "1rem",
      minWidth: "30rem",
      maxWidth: "60rem",
      padding: "2rem",
    },
    upcomingEventRow: {
      cursor: "pointer",
    },
    journalContentCell: {
      maxWidth: "25rem",
    },
  });

  const classes = useStyles();

  return (
    <>
      {homeDefaultView && (
        <div id="home-wrapper">
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
              <p>Date: {moment(popoverEvent.date).format("MM-DD-YYYY")}</p>
              <p>Location: {popoverEvent.location}</p>
              <p>Event Type: {popoverEvent.type}</p>
              <p>Description: {popoverEvent.description}</p>
              <a href={popoverEvent.link}>Link to Event</a>
            </div>
          </Popover>
          <div id="home-user-info">
            <img
              src={user.profile_pic}
              style={{
                height: 200,
                width: 200,
                objectFit: "cover",
                borderRadius: "50%",
                border: "solid gray 1px",
              }}
            />
            <div style={{ textAlign: "center" }}>
              <Button
                color="secondary"
                size="small"
                onClick={() => {
                  setHomeDefaultView(false);
                  setParentEditScreen(true);
                }}
              >
                Edit Profile Info
              </Button>
            </div>
            <div id="home-user-content">
              <h3 id="user-info-name">
                {user.first_name} {user.last_name}
              </h3>
              <h5>
                {user.city && `${user.city}, `}
                {user.state}
              </h5>

              <h3>Upcoming Events</h3>
              {events.length > 0 ? (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {events.map((event) => (
                        <TableRow
                          key={event.id}
                          className={classes.upcomingEventRow}
                          onClick={(e) => {
                            setAnchorElement(e.target);
                            setPopoverEvent(event);
                          }}
                        >
                          <TableCell>{event.name}</TableCell>
                          <TableCell>
                            {moment(event.date).format("MM-DD-YYYY")}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <h5>No Upcoming Events</h5>
              )}
            </div>
          </div>
          <Paper className={classes.homeContentPaper}>
            {user.child_first_name ? (
              <div>
                <h1 id="home-remembering">Remembering</h1>
                <div style={{ display: "flex" }}>
                  <img
                    src={user.second_photo}
                    style={{
                      height: 200,
                      width: 200,
                      objectFit: "cover",
                      borderRadius: "50%",
                      border: "solid gray 1px",
                    }}
                  />
                  <div id="memorial-info">
                    <h2>
                      {user.child_first_name} {user.child_last_name}
                    </h2>
                    <h4>
                      {moment(user.birthday).format("MM-DD-YYYY")} -{" "}
                      {moment(user.memorial_day).format("MM-DD-YYYY")}
                    </h4>
                  </div>
                </div>
                <h2>My Story</h2>
                <p>{user.story}</p>
              </div>
            ) : (
              <Button color="primary" variant="contained">
                Add a Memorial
              </Button>
            )}
            <div>
              <h2>Journal</h2>
              <form onSubmit={addJournal}>
                <input
                  type="text"
                  placeholder="What's on your mind?"
                  value={entry}
                  onChange={(e) => {
                    setEntry(e.target.value);
                  }}
                />
                <button type="submit">Submit</button>
              </form>
              {journals.length > 0 ? (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Content</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {journals.map((entry) => (
                        <TableRow key={entry.id}>
                          <TableCell>
                            {moment(entry.date).format("MM-DD-YYYY")}
                          </TableCell>
                          <TableCell className={classes.journalContentCell}>
                            {entry.content}
                          </TableCell>
                          <TableCell>
                            <FormControl component="fieldset">
                              <RadioGroup
                                aria-label="gender"
                                name="gender1"
                                value={entry.public}
                                onChange={(e) =>
                                  dispatch({
                                    type: "UPDATE_JOURNAL_ENTRY_PRIVACY",
                                    payload: {
                                      userId: user.id,
                                      journalId: entry.id,
                                      newPrivacy: e.target.value,
                                    },
                                  })
                                }
                              >
                                <FormControlLabel
                                  value={false}
                                  control={<Radio color="primary" />}
                                  label="Private"
                                />
                                <FormControlLabel
                                  value={true}
                                  control={<Radio color="primary" />}
                                  label="Public"
                                />
                              </RadioGroup>
                            </FormControl>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <h5>No Journal Entries</h5>
              )}
            </div>
          </Paper>
        </div>
      )}
      {parentEditScreen && (
        <EditUserInfo
          setParentEditScreen={setParentEditScreen}
          setHomeDefaultView={setHomeDefaultView}
        />
      )}
      {/*
      <div className="col">
        <div className="row">
          <div className="child-info-container">
            {childEditScreen ? (
              <>
                <div className="child-info-col">
                  <p>Child's Picture</p>
                  <ReactFilestack
                    className="btn btn-outline-info"
                    apikey={api_key}
                    buttonText="Upload Image"
                    options={basicOptions}
                    onSuccess={onChildSuccess}
                    onError={onError}
                  />
                  <p>Child's Last Name</p>
                  <input
                    type="text"
                    placeholder="Child's Last Name"
                    value={childLastName}
                    onChange={(e) => {
                      setChildLastName(e.target.value);
                    }}
                  />
                </div>
                <div className="child-info-row">
                  <p>Child's Birthdate</p>
                  <input
                    type="date"
                    placeholder="Child's Birthdate"
                    value={bday}
                    onChange={(e) => {
                      setBday(e.target.value);
                    }}
                  />
                  <p>Child's Memorial Date</p>
                  <input
                    type="date"
                    placeholder="Child's Memorial Day"
                    value={memDay}
                    onChange={(e) => {
                      setMemDay(e.target.value);
                    }}
                  />
                </div>

                <div className="child-story">
                  <p>Story</p>
                  <input
                    type="text"
                    placeholder="Story"
                    value={story}
                    onChange={(e) => {
                      setStory(e.target.value);
                    }}
                  />
                  <p>Child's Special Setiment</p>
                  <input
                    type="text"
                    placeholder="Special Sentiment"
                    value={sentiment}
                    onChange={(e) => {
                      setSentiment(e.target.value);
                    }}
                  />
                  <br />
                  <button onClick={saveChild}>Save</button>
                </div>
              </>
            ) : (
              <>
                  <button onClick={editChild}>Edit Child Info</button>

              </>
            )}
          </div>
        </div>
      </div> */}
    </>
  );
}

// this allows us to use <App /> in index.js
export default HomePage;
