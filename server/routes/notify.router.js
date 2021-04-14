const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();

const env = process.env;

var admin = require("firebase-admin");

const serviceAccount = {
  type: env.TYPE,
  project_id: env.PROJECT_ID,
  private_key_id: env.PRIVATE_KEY_ID,
  private_key: env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: env.CLIENT_EMAIL,
  client_id: env.CLIENT_ID,
  auth_uri: env.AUTH_URI,
  token_uri: env.TOKEN_URI,
  auth_provider_x509_cert_url: env.AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: env.CLIENT_CERT_URL
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

router.post("/", rejectUnauthenticated, (req, res) => {
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

router.post("/urgent", rejectUnauthenticated, (req, res) => {
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

router.post("/all", rejectUnauthenticated, (req, res) => {
  let tokens = [];
  const message = req.body;
  tokens.push(message.token);
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
  console.log(notification, data, tokens, webpush);
  admin
    .messaging()
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
      res.send(response);
    })
    .catch((error) => {
      console.log("Error sending notification:", error);
    });
});

router.post("/urgent", rejectUnauthenticated, (req, res) => {
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

module.exports = router;
