import { useEffect, useState } from "react";
import { getToken, onMessageListener } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from '@material-ui/core/Snackbar';
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
// import { Toast } from "react-bootstrap";

function Notifications() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [isTokenFound, setTokenFound] = useState(false);
  const [token, setToken] = useState("");
  const [notificationToggle, setNotificationToggle] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShow(false);
  };

  const handleExited = () => {
    setShow(false);
  };

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
      })
      .catch((err) => console.log("failed: ", err));
  }, [show, notification]);

  function addClientToken(event, props) {
    event.preventDefault();
    setNotificationToggle(false);
    dispatch({
      type: "FETCH_TOKEN",
      payload: {
        id: user.id,
        client_token: token,
      },
    });
    alert('Subscribed To Notifications!')
  }

  return (
    <div>
      <Snackbar
        autohide="true"
        open={show}
        onClose={handleClose}
        onExited={handleExited}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        autoHideDuration={6000}
        message={`Title: ${notification.title} Message: ${notification.body}`}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        }
      />
      {!user.client_token && <form style={{ textAlign: "center" }}>
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={addClientToken}
        >
          Subscribe to Push Notifications
        </Button>
      </form>}
    </div>
  );
}

export default Notifications;