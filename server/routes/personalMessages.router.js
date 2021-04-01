const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();

router.post("/", (req, res) => {
  console.log(req.body);
  const messages = req.body;
  const queryText = `INSERT INTO "personalMessages" ( "user_id", "title", "body")
    VALUES ($1, $2, $3);`;
  pool
    .query(queryText, [messages.user_id, messages.title, messages.body])
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log(`error in messagePost with`, err);
      res.sendStatus(500);
    });
});

router.get("/:id", (req, res) => {
  id = req.params.id;
  console.log("log in personalMessage router", id);
  const queryText = `SELECT * FROM "personalMessages" WHERE "user_id" = ${id};`;
  pool
    .query(queryText)
    .then((result) => {
      console.log("get req. in personalMessages ");
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(`error in in personalMessagess GET`, err);
      res.sendStatus(500);
    });
});

//DELETE for specific message
router.delete("/:id", (req, res) => {
  // Deletes an event by id
  id = req.params.id;
  console.log("log in delete personalMessage router", id);
  const queryText = ` 
    DELETE FROM "personalMessages" WHERE "id" = ${id};
  `;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows).status(204);
    })
    .catch((err) => {
      res.send(err).status(500);
    });
});

module.exports = router;
