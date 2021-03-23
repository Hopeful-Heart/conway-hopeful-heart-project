const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route template
 */
router.get("/", (req, res) => {
  // GET route code here
});

router.get("/:id", rejectUnauthenticated, (req, res) => {
  // GET jobs by id for details page
  id = req.params.id;
  const queryText = `SELECT * FROM "journal" WHERE "user_id" = ${id}`;
  pool
    .query(queryText)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log(`error in journal GET by user_id with`, err);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post("/", rejectUnauthenticated, (req, res) => {
  // POST route code here
  const journal = req.body.journal;
  const queryText = `INSERT INTO "journal" ("user_id", "date", "content", "public")
    VALUES ($1, NOW(), $2, FALSE)`;
  console.log(journal);
  pool
    .query(queryText, [
      journal.id,
      journal.content,
    ])
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log(`error in Journal Post with`, err);
      res.sendStatus(500);
    });
});

module.exports = router;
