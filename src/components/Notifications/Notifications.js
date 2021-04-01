import { useEffect, useState } from "react";
import { getToken, onMessageListener } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "react-bootstrap";

function Notifications() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [isTokenFound, setTokenFound] = useState(false);
  const [token, setToken] = useState("");
  const [notificationToggle, setNotificationToggle] = useState(false);

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
        console.log(
          `title: ${payload.notification.title},
          body: ${payload.notification.body}`
        );
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
  }

  return (
    <div className="App">
      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
        animation
        style={{
          position: "absolute",
          top: 120,
          right: 60,
        }}
      >
        <Toast.Header>
          <strong>{notification.title}</strong>
          <small> ... just now </small>
        </Toast.Header>
        <Toast.Body>{notification.body}</Toast.Body>
      </Toast>
      <form style={{ textAlign: "center" }}>
        <button
          type="button"
          onClick={() =>
            notificationToggle
              ? setNotificationToggle(false)
              : setNotificationToggle(true)
          }
        >
          Subscribe to Push Notifications
        </button>
        {notificationToggle && (
          <div>
            <p>
              To recieve announcements and be notified of new messageses, enable
              push notifications on your main device
            </p>
            <button onClick={addClientToken}>
              Click here to receive notifications
            </button>
            {/* <button onClick={() => setNotificationToggle(false)}>
              Disable Notifications
            </button> */}
          </div>
        )}
      </form>
    </div>
  );
}

export default Notifications;
