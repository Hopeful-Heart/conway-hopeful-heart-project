const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();

//POST to add an event
router.post("/", rejectUnauthenticated, (req, res) => {
  // Creates a new event
  const queryText = `
    INSERT INTO "events" ( "user_id", "name", "date", "location", "description", "type", "link", "picture", "admin_approved" )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
  `;

  pool
    .query(queryText, [
      req.user.id,
      req.body.name,
      req.body.date,
      req.body.location,
      req.body.description,
      req.body.type,
      req.body.link,
      req.body.picture,
      req.user.admin_user ? true : false,
    ])
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      res.sendStatus(500);
      console.log(err);
    });
});

//GET for the next 10 events
router.get("/recent", rejectUnauthenticated, (req, res) => {
  const queryText = `
  SELECT * FROM "events"
  WHERE "date" <= NOW() + interval '10 days'
  AND "admin_approved" = 'true';
  `;

  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows).status(204);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

//GET for admin approved events
router.get("/approved/:sort", rejectUnauthenticated, (req, res) => {
  const sortParam = req.params.sort;

  const sqlQuery = `SELECT * FROM "events" WHERE "admin_approved" = 'true'
                    ${sortParam !== "all" ? `AND "type" = '${sortParam}'` : ""};`;

  pool
    .query(sqlQuery)
    .then((response) => {
      console.log("Retrieved admin approved events successfully");
      res.send(response.rows).status(200);
    })
    .catch((err) => {
      console.log("Error in getting approved events", err);
      res.sendStatus(500);
    });
});

//DELETE for specific event
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  // Deletes an event by id
  const queryText = ` 
    DELETE FROM "events" WHERE "id"=$1;
  `;

  pool.query(queryText).then((result) => {
    res.sendStatus(204);
  });
});
module.exports = router;