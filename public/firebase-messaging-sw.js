// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");
// importScripts("/__/firebase/8.3.1/firebase-app.js");
// importScripts("/__/firebase/8.3.1/firebase-messaging.js");
// importScripts("/__/firebase/init.js");
// Initialize the Firebase app in the service worker by passing the generated config

const firebaseConfig = {
  apiKey: "AIzaSyBve8PJaBJWv38BHera1wZHaG4V7f504Oo",
  authDomain: "hopeful-heart-conway.firebaseapp.com",
  projectId: "hopeful-heart-conway",
  storageBucket: "hopeful-heart-conway.appspot.com",
  messagingSenderId: "768516119654",
  appId: "1:768516119654:web:f1354b8f7004196016a1a7",
  measurementId: "G-DTSQKWPNDQ",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
// importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js");
// importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js");
// const firebaseConfig = {
//   apiKey: "AIzaSyBve8PJaBJWv38BHera1wZHaG4V7f504Oo",
//   authDomain: "hopeful-heart-conway.firebaseapp.com",
//   projectId: "hopeful-heart-conway",
//   storageBucket: "hopeful-heart-conway.appspot.com",
//   messagingSenderId: "768516119654",
//   appId: "1:768516119654:web:f1354b8f7004196016a1a7",
//   measurementId: "G-DTSQKWPNDQ",
// };
// firebase.initializeApp(firebaseConfig);
// const messaging = firebase.messaging();
// messaging.setBackgroundMessageHandler(function (payload) {
//   const promiseChain = clients
//     .matchAll({
//       type: "window",
//       includeUncontrolled: true,
//     })
//     .then((windowClients) => {
//       for (let i = 0; i < windowClients.length; i++) {
//         const windowClient = windowClients[i];
//         windowClient.postMessage(payload);
//       }
//     })
//     .then(() => {
//       return registration.showNotification("my notification title");
//     });
//   return promiseChain;
// });
// self.addEventListener("notificationclick", function (event) {
//   console.log(event);
// });
