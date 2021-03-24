const subscriptions = {};
const express = require("express");
const pool = require("../modules/pool");
const webpush = require("web-push");
const encryptLib = require("../modules/encryption");
const router = express.Router();

const vapidKeys = {
  publicKey:
    "BJV4SJjFFh2Cn_IkBTIuigQzslW-KaYJdojE5TpGVhG2G5Rxw7KymDic5DHcPnRIyL92WfPGiT_q9Vi5rw-E6Zw",
  privateKey: "4LoeD4qeHL0UueliYiiH7hrymu79rZLUJw4NK46bHU4",
};

webpush.setVapidDetails(
  "mailto:http://localhost:5000/",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

router.post("/", (req, res) => {
  const subscriptionRequest = req.body;
  const susbscriptionId = encryptLib.encryptPassword(
    JSON.stringify(subscriptionRequest)
  );
  subscriptions[susbscriptionId] = subscriptionRequest;
  res.status(201).json({ id: susbscriptionId });
});

router.get("/", (req, res) => {
  const subscriptionId = req.body;
  console.log(req.body);
  const pushSubscription = subscriptions[subscriptionId];
  webpush
    .sendNotification(
      pushSubscription,
      JSON.stringify({
        title: "New Product Available ",
        text: "HEY! Take a look at this brand new t-shirt!",
        image: "/images/jason-leung-HM6TMmevbZQ-unsplash.jpg",
        tag: "new-product",
        url: "/new-product-jason-leung-HM6TMmevbZQ-unsplash.html",
      })
    )
    .catch((err) => {
      console.log(err);
    });

  res.status(202).json({});
});

module.exports = router;
