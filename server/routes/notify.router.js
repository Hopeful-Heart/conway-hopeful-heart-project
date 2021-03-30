const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();

var admin = require("firebase-admin");
GOOGLE_APPLICATION_CREDENTIALS =
  "/Users/brycebarsness/Downloads/hopeful-heart-conway-firebase-adminsdk-sdlr5-0d0f9d4f49.json";
// const GOOGLE_APPLICATION_CREDENTIALS =
//   process.env.GOOGLE_APPLICATION_CREDENTIALS;

const serviceAccount = require(GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

router.post("/", (req, res) => {
  console.log(req.body);
  const notify = req.body;
  const token = notify.token;
  const title = notify.title;
  const body = notify.body;
  notification = {
    title: title,
    body: body,
  };
  admin
    .messaging()
    .send({ notification, token })
    .then((result) => res.send(result))
    .catch((err) => {
      console.log(`Error sending message:`, err);
      res.sendStatus(500);
    });
});

router.post("/urgent", (req, res) => {
  const urgent = req.body;
  const token = urgent.token;
  const title = urgent.title;
  const body = urgent.body;
  const dataTitle = "urgent.dataTitle";
  notification = {
    title: title,
    body: body,
  };
  data = {
    dataTitle: dataTitle,
    contents: "http://www.news-magazine.com/world-week/21659772",
  };
  webpush = {
    headers: {
      Urgency: "high",
    },
  };
  admin
    .messaging()
    .send({ notification, data, token, webpush })
    .then((result) => res.send(result))
    .catch((err) => {
      console.log(`Error sending message:`, err);
      res.sendStatus(500);
    });
});

router.post("/all", (req, res) => {
  const message = req.body;
  const tokens = message.tokens;
  const title = message.title;
  const body = message.body;
  const dataTitle = "urgent.dataTitle";
  notification = {
    title: title,
    body: body,
  };
  data = {
    dataTitle: dataTitle,
    contents: "http://www.news-magazine.com/world-week/21659772",
  };
  webpush = {
    headers: {
      Urgency: "high",
    },
  };
  messaging
    .sendMulticast({ notification, data, tokens, webpush })
    .then((response) => {
      // Response is an object of the form { responses: [] }
      const successes = response.responses.filter((r) => r.success === true)
        .length;
      const failures = response.responses.filter((r) => r.success === false)
        .length;
      console.log(
        "Notifications sent:",
        `${successes} successful, ${failures} failed`
      );
    })
    .catch((error) => {
      console.log("Error sending notification:", error);
    });
});

module.exports = router;
