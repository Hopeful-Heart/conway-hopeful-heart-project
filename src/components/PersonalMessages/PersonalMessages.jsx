import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

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

  return (
    <>
      { messages[0] ?
        <>
          <h1>Messages</h1>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Sender
              </TableCell>
                <TableCell>
                  Message
              </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {messages.map(message => {
                return (
                  <TableRow
                    key={message.id}
                    onClick={() => deleteMessage(message)}
                    style={{ margin: 2.5 }}
                  >
                    <TableCell>{message.title}</TableCell>
                    <TableCell>{message.body}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table> </> :
        <h1 style={{ textAlign: 'center' }}>No Messages</h1>
      }
    </>
  );
}
export default PersonalMessages;
