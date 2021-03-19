const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();
/*
 * GET route template
 */
router.get('/', (req, res) => {
  const queryText = `
    SELECT * FROM "events";
  `
  pool.query(queryText).then(result => {
    res.send(result.rows)
  }).catch(err => {
    res.send(500)
  })
  // GET route code here
});
/*
 * POST route template
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  const queryText = `
    INSERT INTO "events" ( "user_id", "name", "date", "location", "description", "type" )
    VALUES ($1, $2, $3, $4, $5, $6);
  `
  pool.query(queryText, [req.user.id, req.body.name, req.body.date, req.body.location, req.body.description, req.body.type]).then(result => {
    res.send(result.rows)
  }).catch(err => {
    res.send(500)
    console.log(err)
  })
  // POST route code here
});

module.exports = router;