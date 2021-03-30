import React from "react";
import SendMessage from "../SendMessage/SendMessage";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

function Messaging() {
  const [message, setMessage] = useState([]);
  const [title, setTitle] = useState([]);
  const [token, setToken] = useState([]);
  const user = useSelector((store) => store.user);
  const messages = useSelector((store) => store.message.messageReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_MESSAGES" });
  }, []);

  const deleteMessage = (message) => {
    dispatch({ type: "DELETE_MESSAGE", payload: message });
  };

  let messageList;

  if (messages[0]) {
    messageList = messages.map((message) => (
      <tr
        key={message.id}
        onClick={() => deleteMessage(message)}
        style={{ margin: 2.5 }}
      >
        <td>{message.title}</td>
        <td>{message.body}</td>
        <td>
          {/* <button
            onClick={() => deleteMessage(message)}
            style={{ margin: 2.5 }}
          >
            remove
          </button> */}
        </td>
      </tr>
    ));
  } else {
    messageList = (
      <tr>
        <td>No MESSAGES</td>
      </tr>
    );
  }

  return (
    <div>
      <p>click notification to dismiss</p>
      <table>
        <thead>
          <tr>
            <th>
              <h3>Messages</h3>
            </th>
          </tr>
        </thead>
        <tbody>{messageList}</tbody>
      </table>
      <SendMessage />
    </div>
  );
}
export default Messaging;
