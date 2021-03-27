import firebase from "firebase/app";
import "firebase/messaging";
import { useDispatch } from "react-redux";

var firebaseConfig = {
  apiKey: "AIzaSyBve8PJaBJWv38BHera1wZHaG4V7f504Oo",
  authDomain: "hopeful-heart-conway.firebaseapp.com",
  projectId: "hopeful-heart-conway",
  storageBucket: "hopeful-heart-conway.appspot.com",
  messagingSenderId: "768516119654",
  appId: "1:768516119654:web:f1354b8f7004196016a1a7",
  measurementId: "G-DTSQKWPNDQ",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

export const getToken = (setTokenFound, setToken) => {
  return messaging
    .getToken({
      vapidKey:
        "BI7yt3bVqyqz6d84XPFPkrjV12nj6y6Dl_NE89qUX7EWNegmru3xhBOU_FU01eILSV1YvDPipTx8f0uztOGuKLw",
    })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        setTokenFound(true); // dispatch token to backend
        setToken(currentToken);

        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });

// export const askForPermissioToReceiveNotifications = async () => {
//   try {
//     const messaging = firebase.messaging();

//     await messaging.requestPermission();
//     const token = await messaging.getToken();
//     console.log("user token: ", token);

//     return token;
//   } catch (error) {
//     console.error(error);
//   }
// };
