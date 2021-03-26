const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/:id", rejectUnauthenticated, (req, res) => {
  // GET journal entries by id
  id = req.params.id;
  const queryText = `SELECT * FROM "journal" WHERE "user_id" = ${id} ORDER BY "date" DESC`;
  pool
    .query(queryText)
    .then((result) => {
      console.log("Retrieved journal entries successfully");
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(`error in journal GET by user_id with`, err);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post("/", rejectUnauthenticated, (req, res) => {
  // Adds a new Journal entry
  const journal = req.body.journal;
  const queryText = `INSERT INTO "journal" ("user_id", "date", "content", "public")
    VALUES ($1, NOW(), $2, FALSE)`;
  pool
    .query(queryText, [journal.id, journal.content])
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log(`error in Journal Post with`, err);
      res.sendStatus(500);
    });
});

module.exports = router;
