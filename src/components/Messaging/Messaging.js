import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';

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
      <TableRow key={message.id} onClick={() => deleteMessage(message)}>
        <TableCell align="center">{message.title}</TableCell>
        <TableCell align="center">{message.body}</TableCell>
      </TableRow>
    ));
  }

  return (
    <div style={{paddingLeft:50, paddingRight:50}}>
      {messages[0] ?
        <>
          <h1 style={{ textAlign: 'center' }}>Announcements</h1>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  Title
                </TableCell>
                <TableCell align="center">
                  Message
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {messageList}
            </TableBody>
          </Table>
        </> : <h1>No Announcements</h1>}

    </div>
  );
}
export default Messaging;
