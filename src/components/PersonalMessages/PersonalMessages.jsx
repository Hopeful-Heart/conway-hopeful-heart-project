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
    dispatch({ type: "FETCH_PERSONAL_MESSAGES", payload: user.id });
  }, []);

  const deleteMessage = (message) => {
    dispatch({ type: "DELETE_PERSONAL_MESSAGES", payload: message });
  };

  return (
    <div>
      <Paper className={classes.paper}>
        <>
          {messages[0] ? (
            <>
              <h1>Messages</h1>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ textAlign: "center" }}>Date</TableCell>
                    <TableCell style={{ textAlign: "center" }}>Sender</TableCell>
                    <TableCell style={{ textAlign: "center" }}>Message</TableCell>
                    <TableCell style={{ textAlign: "center" }}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {messages.map((message) => {
                    return (
                      <TableRow key={message.id} style={{ margin: 2.5 }}>
                        <TableCell>
                          {moment(message.sent).format("MM-DD-YYYY")}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>{message.title}</TableCell>
                        <TableCell style={{ textAlign: "center" }}>{message.body}</TableCell>
                        <TableCell>
                          <Button onClick={() => deleteMessage(message)}>Delete</Button>
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
