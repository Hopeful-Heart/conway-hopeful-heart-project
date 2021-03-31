const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();

router.post("/", (req, res) => {

  const messages = req.body;
  const queryText = `INSERT INTO "messages" ("title", "body")
    VALUES ($1, $2);`;
  pool
    .query(queryText, [messages.title, messages.body])
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log(`error in messagePost with`, err);
      res.sendStatus(500);
    });
});

router.get("/", (req, res) => {
  const queryText = `SELECT * FROM "messages";`;
  pool
    .query(queryText)
    .then((result) => {
      console.log("get req. in messages ");
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(`error in in messages GET`, err);
      res.sendStatus(500);
    });
});

//DELETE for specific message
router.delete("/:id", (req, res) => {
  // Deletes an event by id
  const queryText = ` 
    DELETE FROM "messages" WHERE "id"=$1;
  `;
  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      res.send(result.rows).status(204);
    })
    .catch((err) => {
      res.send(err).status(500);
    });
});

module.exports = router;
