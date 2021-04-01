import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Paper,
  makeStyles,
  Button,
  ButtonGroup,
  TextField,
} from "@material-ui/core";

function AddJournal({ setAddJournalToggle, setHomeDefaultView }) {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user)
  const [entry, setEntry] = useState("");

  const submitJournalEntry = (e) => {
    e.preventDefault();

    setAddJournalToggle(false);
    setHomeDefaultView(true);

    dispatch({
      type: "ADD_JOURNAL",
      payload: {entry, user_id: user.id}
    });
  };

  const useStyles = makeStyles({
    paper: {
      margin: "auto",
      marginTop: "1rem",
      marginBottom: "1rem",
      width: "fit-content",
      padding: "2rem",
      textAlign: "center",
    },
    multiline: {
      minWidth: "20rem",
    },
  });

  const classes = useStyles();

  return (
    <div className="container">
      <Paper className={classes.paper}>
        <form
          onReset={() => {
            setAddJournalToggle(false);
            setHomeDefaultView(true);
          }}
          onSubmit={submitJournalEntry}
        >
          <h2 style={{ fontSize: "2rem", marginTop: 0 }}>Add Journal Entry</h2>
          <TextField
            multiline
            required
            rows={6}
            label="What's on your mind?"
            variant="outlined"
            className={classes.multiline}
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
          />
          <br />
          <br />
          <ButtonGroup>
            <Button variant="outlined" color="primary" type="reset">
              Back
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </ButtonGroup>
        </form>
      </Paper>
    </div>
  );
}

export default AddJournal;
