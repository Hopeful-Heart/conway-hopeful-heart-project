import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

function PersonalMessages() {
  const [message, setMessage] = useState([]);
  const [title, setTitle] = useState([]);
  const [token, setToken] = useState([]);
  const user = useSelector((store) => store.user);
  const messages = useSelector(
    (store) => store.personal.personalMessagesReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(user.id);
    dispatch({ type: "FETCH_PERSONAL_MESSAGES", payload: user.id });
  }, []);

  const deleteMessage = (message) => {
    dispatch({ type: "DELETE_PERSONAL_MESSAGES", payload: message });
  };

  let messageList;

  //   {/* <td>
  //       {/* <button
  //         onClick={() => deleteMessage(message)}
  //         style={{ margin: 2.5 }}
  //       >
  //         remove
  //       </button> */}
  //     </td> */}

  if (messages[0]) {
    messageList = messages.map((message) => (
      <tr
        key={message.id}
        onClick={() => deleteMessage(message)}
        style={{ margin: 2.5 }}
      >
        <td>{message.title}</td>
        <td>{message.body}</td>
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
    </div>
  );
}
export default PersonalMessages;
