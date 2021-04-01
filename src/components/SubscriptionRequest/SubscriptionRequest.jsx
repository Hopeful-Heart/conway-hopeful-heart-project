function SubscriptionRequest() {
  const [notificationToggle, setNotificationToggle] = useState([false]);

  function askPermission() {
    return new Promise(function (resolve, reject) {
      const permissionResult = Notification.requestPermission(function (
        result
      ) {
        resolve(result);
      });

      if (permissionResult) {
        permissionResult.then(resolve, reject);
      }
    }).then(function (permissionResult) {
      if (permissionResult !== "granted") {
        throw new Error("We weren't granted permission.");
      }
    });
  }

  return (
    <form
      onReset={handleNewMessageReset}
      onSubmit={sendAll ? handleSendAllSubmit : handleNewMessageSubmit}
      style={{ textAlign: "center" }}
    >
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
      {newMessageToggle && (
        <div>
          <p>
            To recieve announcements and be notified of new messageses, enable
            push notifications on your main device
          </p>
          <button onClick={() => setNotificationToggle(true)}>
            Enable Notifications
          </button>
          <button onClick={() => setNotificationToggle(false)}>
            Disable Notifications
          </button>
        </div>
      )}
    </form>
  );
}

export default SubscriptionRequest;
