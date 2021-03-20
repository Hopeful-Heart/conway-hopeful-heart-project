const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();
/*
 * GET route template
 */
router.get('/', (req, res) => {
  // Gets all events
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
  // Creates a new event
  const queryText = `
    INSERT INTO "events" ( "user_id", "name", "date", "location", "description", "type", "link" )
    VALUES ($1, $2, $3, $4, $5, $6, $7);
  `
  pool.query(queryText, [req.user.id, req.body.name, req.body.date, req.body.location, req.body.description, req.body.type, req.body.link]).then(result => {
    res.send(result.rows)
  }).catch(err => {
    res.send(500)
    console.log(err)
  })
  // POST route code here
});

router.delete('/:id', rejectUnauthenticated, (req,res) => {
  // Deletes an event by id
  const queryText = ` 
    DELETE FROM "events" WHERE "id"=$1;
  `
  pool.query(queryText).then(result =>{
    res.sendStatus(204);
  })
})
module.exports = router;