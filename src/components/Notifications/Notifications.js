import { useEffect, useState } from "react";
import { getToken, onMessageListener } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
function Notifications() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [isTokenFound, setTokenFound] = useState(false);
  const [token, setToken] = useState("");

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
          top: 20,
          right: 20,
        }}
      >
        <Toast.Header>
          <strong>{notification.title}</strong>
          <small> ... just now </small>
        </Toast.Header>
        <Toast.Body>{notification.body}</Toast.Body>
      </Toast>
      {/* <header>
        {isTokenFound && <h1> Notification permission enabled 👍🏻 </h1>}
        {!isTokenFound && <h1> Need notification permission ❗️ </h1>}
        <Button onClick={() => setShow(true)}>Show Toast</Button>
      </header> */}

      <button onClick={addClientToken}>
        Click here to receive notifications
      </button>
    </div>
  );
}

export default Notifications;
