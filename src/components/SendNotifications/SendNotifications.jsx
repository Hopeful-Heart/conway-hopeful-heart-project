import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Button from '@material-ui/core/Button';

function SendMessage() {
  const [message, setMessage] = useState([]);
  const [title, setTitle] = useState([]);
  const [token, setToken] = useState([]);

  const dispatch = useDispatch();
  const [newMessageToggle, setNewMessageToggle] = useState(false);
  const [newMessage, setNewMessage] = useState({
    title: "",
    message: "",
  });

  const handleNewMessageReset = () => {
    setNewMessage({
      title: "",
      message: "",
    });
    setNewMessageToggle(false);
  };

  const handleNewMessageSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_MESSAGE", payload: newMessage });
    setNewMessage({
      title: "",
      message: "",
    });
    setNewMessageToggle(false);
  };

  return (
    <form
      onReset={handleNewMessageReset}
      onSubmit={handleNewMessageSubmit}
      style={{ textAlign: "center" }}
    >
      <Button
        variant="contained" color="primary"
        type="button"
        onClick={() =>
          newMessageToggle
            ? setNewMessageToggle(false)
            : setNewMessageToggle(true)
        }
      >
        Add Message
      </Button>
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
            value={newMessage.message}
            onChange={(e) =>
              setNewMessage({ ...newMessage, message: e.target.value })
            }
          />
          <br />
          <Button variant="contained" color="primary" type="reset">Cancel</Button>
          <Button variant="contained" color="primary" type="submit">Submit</Button>
        </div>
      )}
    </form>
  );
}

export default SendMessage;
