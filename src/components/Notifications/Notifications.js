import { useEffect, useState } from "react";
import { getToken, onMessageListener } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar, Button, makeStyles } from "@material-ui/core";
import { askForPermissioToReceiveNotifications } from "./firebase";

function Notifications(props) {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [isTokenFound, setTokenFound] = useState(false);
  const [token, setToken] = useState("");

  const useStyles = makeStyles({
    snackbar: {
      backgroundColor: "white",
    },
  });

  const classes = useStyles();

  useEffect(() => {
    getToken(setTokenFound, setToken);
    onMessageListener()
      .then((payload) => {
        setShow(true); // turns on toast
        // sets local information state for the notifcation based on the push payload
        setNotification({
          title: payload.notification.title,
          body: payload.notification.body,
        });
        console.log(payload);
      })
      .catch((err) => console.log("failed: ", err));
  }, [show, notification]);

  function addClientToken(event, props) {
    event.preventDefault();
    dispatch({
      type: "FETCH_TOKEN",
      payload: {
        id: user.id,
        client_token: token,
      },
    });
  }

  return (
    <div className="App">
      <Snackbar
        className={classes.snackbar}
        onClose={() => setShow(false)}
        open={show}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={6000}
      >
        {notification.body}
      </Snackbar>
      <header className="App-header">
        {isTokenFound && <h1> Notification permission enabled 👍🏻 </h1>}
        {!isTokenFound && <h1> Need notification permission ❗️ </h1>}
        <Button onClick={() => setShow(true)}>Show Toast</Button>
      </header>

      <button onClick={(askForPermissioToReceiveNotifications, addClientToken)}>
        Click here to receive notifications
      </button>
    </div>
  );
}

export default Notifications;
