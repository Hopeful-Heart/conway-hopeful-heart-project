import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Notifications from "../Notifications/Notifications";
import connectionsReducer from "../../redux/reducers/connections.reducer";
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
    title: `From : ${user.first_name} ${user.last_name}`,
    body: "",
    token: connection.client_token,
    user_id: connection.id,
  });

  const handleNewMessageReset = () => {
    setNewMessage({
      title: `From : ${user.first_name} ${user.last_name}`,
      body: "",
      token: connection.client_token,
      user_id: connection.id,
    });
    setNewMessageToggle(false);
  };

  const handleNewMessageSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "SEND_PERSONAL_MESSAGES", payload: newMessage });
    setNewMessage({
      title: `From : ${user.first_name} ${user.last_name}`,
      body: "",
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
      title: `From : ${user.first_name} ${user.last_name}`,
      body: "",
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
      <button
        type="button"
        class="filestack-button"
        onClick={() =>
          newMessageToggle
            ? setNewMessageToggle(false)
            : setNewMessageToggle(true)
        }
      >
        Send Message
      </button>
      {newMessageToggle && (
        <div>
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
          <button margin="20px" class="filestack-button" type="reset">
            Cancel
          </button>
          <button margin="20px" class="filestack-button" type="submit">
            Send
          </button>
        </div>
      )}
    </form>
  );
}

export default SendConnectionMessage;
