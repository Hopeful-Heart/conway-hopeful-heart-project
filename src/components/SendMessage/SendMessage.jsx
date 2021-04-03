import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Notifications from "../Notifications/Notifications";
import connectionsReducer from "../../redux/reducers/connections.reducer";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

function SendMessage({ setDefaultAdminView, setMessagingAdminView }) {
  const user = useSelector((store) => store.user);
  const userSearchList = useSelector((store) => store.userSearch);
  const [message, setMessage] = useState([]);
  const [title, setTitle] = useState([]);
  const [token, setToken] = useState([]);
  const [sendAll, setSendAll] = useState([false]);
  const dispatch = useDispatch();
  const [newMessageToggle, setNewMessageToggle] = useState(false);
  const [newMessage, setNewMessage] = useState({
    title: "",
    body: "",
    token: user.client_token,
  });

  const handleNewMessageReset = () => {
    setNewMessage({
      title: "",
      body: "",
      token: user.client_token,
    });
    setNewMessageToggle(false);
  };

  const handleNewMessageSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_MESSAGE", payload: newMessage });
    setNewMessage({
      title: "",
      body: "",
      token: user.client_token,
    });
    setNewMessageToggle(false);
  };

  const handleSendAllSubmit = (e) => {
    e.preventDefault();
    setNewMessage({
      token: allTokens,
    });
    dispatch({ type: "SEND_MESSAGE_ALL", payload: newMessage });
    setNewMessage({
      title: "",
      body: "",
      token: user.client_token,
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

  let allTokens = [];
  for (let user in userSearchList) {
    if (user.client_token) {
      allTokens.push(user.client_token);
    }
  }

  const resetDefaultAdminView = () => {
    setDefaultAdminView(true)
    setMessagingAdminView(false)
  }

  return (
    <>
      <Button  style={{margin:20}} onClick={resetDefaultAdminView} variant="contained" color="primary">Back</Button>
      <form
        onReset={handleNewMessageReset}
        onSubmit={sendAll ? handleSendAllSubmit : handleNewMessageSubmit}
        style={{ textAlign: "center" }}
      >
        <Button
          type="button"
          variant="contained" color="primary"
          onClick={() =>
            newMessageToggle
              ? setNewMessageToggle(false)
              : setNewMessageToggle(true)
          }
        >
          Post Announcement
        </Button>
        {newMessageToggle && (
          <div>
            <br />
            <TextField
              required
              style={{margin:10}}
              type="text"
              id="add-message-title"
              variant="outlined" 
              label="Title"
              value={newMessage.title}
              onChange={(e) =>
                setNewMessage({ ...newMessage, title: e.target.value })
              }
            />
            <br />
            <TextField
              style={{margin:10}}
              label="Message"
              multiline
              rows={5}
              rowsMax={10}
              variant="outlined"
              required
              id="add-message-body"
              value={newMessage.body}
              onChange={(e) =>
                setNewMessage({ ...newMessage, body: e.target.value })
              }
            />
            <br />
            <Button style={{margin:10}} variant="contained" color="primary" type="reset">Cancel</Button>
            <Button style={{margin:10}} variant="contained" color="primary" onClick={() => setSendAll(true)} type="submit">
              Send Announcement
            </Button>
          </div>
        )}
      </form>
    </>

  );
}

export default SendMessage;
