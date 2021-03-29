const express = require("express");
const {
    rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/all", rejectUnauthenticated, (req, res) => {
    // GET all connections
    const queryText = `SELECT * FROM "connections"`;
    pool
        .query(queryText)
        .then((result) => {
            console.log("Retrieved connection entries successfully");
            res.send(result.rows);
        })
        .catch((err) => {
            console.log(`error in connection GET all with`, err);
            res.sendStatus(500);
        });
});


router.get("/:id", rejectUnauthenticated, (req, res) => {
    // GET connection entries by id
    id = req.params.id;
    console.log(id);
    const queryText = `SELECT * FROM "connections" WHERE "user2_id" = $1`;
    pool
        .query(queryText, [id])
        .then((result) => {
            console.log("Retrieved connection entries successfully");
            res.send(result.rows);
        })
        .catch((err) => {
            console.log(`error in connection GET by user2_id with`, err);
            res.sendStatus(500);
        });
});

/**
 * POST route template
 */
router.post("/", rejectUnauthenticated, (req, res) => {
    // Adds a new Connection entry
    const connection = req.body.connection;
    const queryText = `INSERT INTO "connections" ("user1_id", "user2_id")
    VALUES ($1, $2)`;
    pool
        .query(queryText, [connection.user1, connection.user2])
        .then((result) => res.send(result.rows))
        .catch((err) => {
            console.log(`error in Connection Post with`, err);
            res.sendStatus(500);
        });
});

/**
 * PUT route template
 */
router.put("/:id", rejectUnauthenticated, (req, res) => {
    // UPDATE connection approved by id
    id = req.params.id;
    console.log(id);
    const queryText = `UPDATE "connections" SET "approved" = true WHERE "user1_id" = $1`;
    pool
        .query(queryText, [id])
        .then((result) => {
            console.log("Updated connection approved collumn successfully");
            res.send(result.rows);
        })
        .catch((err) => {
            console.log(`error in connection PUT by id with`, err);
            res.sendStatus(500);
        });
});


/**
 * DELETE route template
 */
router.delete("/:id", rejectUnauthenticated, (req, res) => {
    // DELETE connection by id
    id = req.params.id;
    console.log(id);
    const queryText = `DELETE FROM "connections" WHERE "user1_id" = $1`;
    pool
        .query(queryText, [id])
        .then((result) => {
            console.log("Deleted connection row successfully");
            res.send(result.rows);
        })
        .catch((err) => {
            console.log(`error in connection DELETE by id with`, err);
            res.sendStatus(500);
        });
});

module.exports = router;