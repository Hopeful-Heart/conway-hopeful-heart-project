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
  IconButton,
  Tooltip,
} from "@material-ui/core";

import "./HomePage.css";

import EditUserInfo from "./EditUserInfo";
import MemorialForm from "./MemorialForm";
import AddJournal from "./AddJournal";

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

function HomePage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const events = useSelector((store) => store.events.recentEventsListReducer);
  const journals = useSelector((store) => store.journal.journalListReducer);

  const [homeDefaultView, setHomeDefaultView] = useState(true);
  const [parentEditScreen, setParentEditScreen] = useState(false);
  const [memorialFormToggle, setMemorialFormToggle] = useState(false);
  const [editMemorialToggle, setEditMemorialToggle] = useState(false);
  const [addJournalToggle, setAddJournalToggle] = useState(false);

  const [anchorElement, setAnchorElement] = useState(null);
  const [popoverEvent, setPopoverEvent] = useState({});

  const open = Boolean(anchorElement);

  const eventTypes = [
    { value: "nd", name: "North Dakota" },
    { value: "ne", name: "Nebraska" },
    { value: "virtual", name: "Virtual" },
    { value: "user", name: "User" },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_RECENT_EVENTS" });
    dispatch({ type: "FETCH_JOURNAL", payload: user.id });
  }, []);

  const useStyles = makeStyles({
    homeContentPaper: {
      margin: "auto",
      marginTop: "1rem",
      marginBottom: "1rem",
      minWidth: "50rem",
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
            <div className="popover">
              <img
                src={popoverEvent.picture}
                style={{
                  width: "100%",
                  maxHeight: "10rem",
                  objectFit: "cover",
                  borderRadius: "4, 4, 0, 0",
                }}
              />
              <div className="popover-content">
                <h3>{popoverEvent.name}</h3>
                <p>Date: {moment(popoverEvent.date).format("MM-DD-YYYY")}</p>
                <p>Location: {popoverEvent.location}</p>
                <p>
                  Event Type:{" "}
                  {eventTypes.map(
                    (type) => type.value === popoverEvent.type && type.name
                  )}
                </p>
                <p>Description: {popoverEvent.description}</p>
                <a href={popoverEvent.link}>Link to Event</a>
              </div>
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
            {user.memorial && (
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <h1 id="home-remembering">Remembering</h1>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => {
                      setHomeDefaultView(false);
                      setMemorialFormToggle(true);
                      setEditMemorialToggle(true);
                    }}
                  >
                    Edit Memorial
                  </Button>
                </div>
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
                      Birth Date: {moment(user.birthday).format("MM-DD-YYYY")}
                    </h4>
                    <h4>
                      Memorial Date:{" "}
                      {moment(user.memorial_day).format("MM-DD-YYYY")}
                    </h4>
                  </div>
                </div>
                <h2>My Story</h2>
                <p>{user.story}</p>
              </div>
            )}
            <br />
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <h2 id="home-journal">
                  Journal
                  <Tooltip title="Add Journal Entry">
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setHomeDefaultView(false);
                        setAddJournalToggle(true);
                      }}
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </Tooltip>
                </h2>
                {!user.memorial && (
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => {
                      setHomeDefaultView(false);
                      setMemorialFormToggle(true);
                    }}
                  >
                    Add a Memorial
                  </Button>
                )}
              </div>
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
      {memorialFormToggle && (
        <MemorialForm
          setMemorialFormToggle={setMemorialFormToggle}
          setHomeDefaultView={setHomeDefaultView}
          editMemorialToggle={editMemorialToggle}
          setEditMemorialToggle={setEditMemorialToggle}
        />
      )}
      {addJournalToggle && (
        <AddJournal
          setAddJournalToggle={setAddJournalToggle}
          setHomeDefaultView={setHomeDefaultView}
        />
      )}
    </>
  );
}

// this allows us to use <App /> in index.js
export default HomePage;
