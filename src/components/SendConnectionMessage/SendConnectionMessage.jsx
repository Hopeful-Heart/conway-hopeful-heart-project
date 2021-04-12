import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Notifications from "../Notifications/Notifications";
import connectionsReducer from "../../redux/reducers/connections.reducer";
import {
  Paper,
  makeStyles,
  Button,
  ButtonGroup,
  TextField,
} from "@material-ui/core";
function SendConnectionMessage(props) {
  //   const user = useSelector((store) => store.user);
  const userSearchList = useSelector((store) => store.userSearch);
  const connection = props.connection;
  const user = props.user;
  const [message, setMessage] = useState([]);
  const [title, setTitle] = useState([]);
  const [token, setToken] = useState([]);
  const [sendAll, setSendAll] = useState([false]);
  const dispatch = useDispatch();
  const [newMessageToggle, setNewMessageToggle] = useState(false);
  const [newMessage, setNewMessage] = useState({
    title: `${user.first_name} ${user.last_name}`,
    body: "",
    sent: new Date(),
    token: connection.client_token,
    user_id: connection.id,
  });

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

  const handleNewMessageReset = () => {
    setNewMessage({
      title: `${user.first_name} ${user.last_name}`,
      body: "",
      sent: new Date(),
      token: connection.client_token,
      user_id: connection.id,
    });
    setNewMessageToggle(false);
  };

  const handleNewMessageSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "SEND_PERSONAL_MESSAGES", payload: newMessage });
    setNewMessage({
      title: `${user.first_name} ${user.last_name}`,
      body: "",
      sent: new Date(),
      token: connection.client_token,
      user_id: connection.id,
    });
    setNewMessageToggle(false);
  };

  const handleSendAllSubmit = (e) => {
    e.preventDefault();
    setNewMessage({
      token: allTokens,
    });
    dispatch({ type: "SEND_PERSONAL_MESSAGES", payload: newMessage });
    setNewMessage({
      title: `${user.first_name} ${user.last_name}`,
      body: "",
      sent: new Date(),
      token: connection.client_token,
    });
    setSendAll(false);
    setNewMessageToggle(false);
  };

  useEffect(() => {
    dispatch({
      type: "FETCH_USER_SEARCH_LIST",
      payload: { state: "All States" },
    });
  }, []);

  return (
    <form
      onReset={handleNewMessageReset}
      onSubmit={handleNewMessageSubmit}
      style={{ textAlign: "center" }}
    >
      <Button
        variant="contained"
        color="primary"
        style={{ margin: 20, width: 150 }}
        type="button"
        class="filestack-button"
        onClick={() =>
          newMessageToggle
            ? setNewMessageToggle(false)
            : setNewMessageToggle(true)
        }
      >
        Send Message
      </Button>
      {newMessageToggle && (
        <div className="container">
          <Paper className={classes.paper}>
            <div>
              <TextField
                variant="outlined"
                label="Message"
                multiline
                rows={5}
                rowsMax={10}
                required
                id="add-message-body"
                value={newMessage.body}
                onChange={(e) =>
                  setNewMessage({ ...newMessage, body: e.target.value })
                }
              />
              <br />
              <Button
                style={{ margin: 10 }}
                variant="contained"
                color="primary"
                margin="20px"
                class="filestack-button"
                type="reset"
              >
                Cancel
              </Button>
              <Button
                style={{ margin: 10 }}
                variant="contained"
                color="primary"
                margin="20px"
                class="filestack-button"
                type="submit"
              >
                Send
              </Button>
            </div>
          </Paper>
        </div>
      )}
    </form>
  );
}

export default SendConnectionMessage;
