import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {
  Paper,
  makeStyles,
  Button,
  ButtonGroup,
  TextField,
} from "@material-ui/core";
import moment from "moment";
function PersonalMessages() {
  const [message, setMessage] = useState([]);
  const [title, setTitle] = useState([]);
  const [token, setToken] = useState([]);
  const user = useSelector((store) => store.user);
  const messages = useSelector(
    (store) => store.personal.personalMessagesReducer
  );

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

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(user.id);
    dispatch({ type: "FETCH_PERSONAL_MESSAGES", payload: user.id });
  }, []);

  const deleteMessage = (message) => {
    dispatch({ type: "DELETE_PERSONAL_MESSAGES", payload: message });
  };

  return (
    <div className="container">
      <Paper className={classes.paper}>
        <>
          {messages[0] ? (
            <>
              <h1>Messages</h1>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Sender</TableCell>
                    <TableCell>Message</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {messages.map((message) => {
                    return (
                      <TableRow key={message.id} style={{ margin: 2.5 }}>
                        <TableCell>
                          {moment(message.sent).format("MM-DD-YYYY")}
                        </TableCell>
                        <TableCell>
                          {message.title}
                        </TableCell>
                        <TableCell>
                          {message.body}
                        </TableCell>
                        <TableCell>
                          <Button style={{ textAlign: 'center' }} onClick={() => deleteMessage(message)}>Delete</Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>{" "}
            </>
          ) : (
            <h1 style={{ textAlign: "center" }}>No Messages</h1>
          )}
        </>
      </Paper>
    </div>
  );
}
export default PersonalMessages;
