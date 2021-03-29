const express = require("express");
const {
    rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/:id", rejectUnauthenticated, (req, res) => {
    // GET journal entries by id
    id = req.params.id;
    const queryText = `SELECT * FROM "connections" WHERE "user2_id" = ${id} WHERE "approved" = FALSE`;
    pool
        .query(queryText)
        .then((result) => {
            console.log("Retrieved connection entries successfully");
            res.send(result.rows);
        })
        .catch((err) => {
            console.log(`error in connection GET by user_id with`, err);
            res.sendStatus(500);
        });
});

/**
 * POST route template
 */
router.post("/", rejectUnauthenticated, (req, res) => {
    // Adds a new Connection entry
    const connection = req.body.connection;
    const queryText = `INSERT INTO "connections" ("user1_id", "user2_id", "approved")
    VALUES ($1, $2, FALSE)`;
    pool
        .query(queryText, [connection.user1, connection.user2])
        .then((result) => res.send(result.rows))
        .catch((err) => {
            console.log(`error in Connection Post with`, err);
            res.sendStatus(500);
        });
});

module.exports = router;