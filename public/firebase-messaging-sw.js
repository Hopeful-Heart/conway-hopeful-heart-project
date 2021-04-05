importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

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

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "./hopefulHeartIcon.png",
  };
});
