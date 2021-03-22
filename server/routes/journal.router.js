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
  const queryText = `INSERT INTO "journal" ("user_id", "date", "content", "public")
    VALUES ($1, $2, $3, $4)`;
  console.log(req.body);
  pool
    .query(queryText, [
      req.user.id,
      req.body.date,
      req.body.content,
      req.body.public,
    ])
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log(`error in Journal Post with`, err);
      res.sendStatus(500);
    });
});

module.exports = router;
