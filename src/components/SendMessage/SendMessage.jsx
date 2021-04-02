import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Notifications from "../Notifications/Notifications";
import connectionsReducer from "../../redux/reducers/connections.reducer";
function SendMessage(props) {
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
    dispatch({ type: "FETCH_USER_SEARCH_LIST", payload: { state: "All States" }, });
  }, []);

  let allTokens = [];
  for (let user in userSearchList) {
    if (user.client_token) {
      allTokens.push(user.client_token);
    }
  }

  return (
    <form
      onReset={handleNewMessageReset}
      onSubmit={sendAll ? handleSendAllSubmit : handleNewMessageSubmit}
      style={{ textAlign: "center" }}
    >
      <button
        type="button"
        onClick={() =>
          newMessageToggle
            ? setNewMessageToggle(false)
            : setNewMessageToggle(true)
        }
      >
        Post Announcement
      </button>
      {newMessageToggle && (
        <div>
          <br />
          <label htmlFor="add-message-title">Title: </label>
          <input
            required
            type="text"
            id="add-message-title"
            value={newMessage.title}
            onChange={(e) =>
              setNewMessage({ ...newMessage, title: e.target.value })
            }
          />
          <br />
          <label htmlFor="add-message-body">Message: </label>
          <textarea
            required
            id="add-message-body"
            value={newMessage.body}
            onChange={(e) =>
              setNewMessage({ ...newMessage, body: e.target.value })
            }
          />
          <br />

          <button type="reset">Cancel</button>
          {/* <button type="submit">Send</button> */}
          <button onClick={() => setSendAll(true)} type="submit">
            Send Announcement
          </button>
        </div>
      )}
    </form>
  );
}

export default SendMessage;
