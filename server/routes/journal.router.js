const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route template
 */
router.get("/", (req, res) => {
  // GET route code here
});

router.get("/:id", (req, res) => {
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
router.post("/", (req, res) => {
  // POST route code here
});

module.exports = router;
