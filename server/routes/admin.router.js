const express = require("express");
const {
    rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", (req, res) => {
    // Gets all pending users
    const queryText = `
      SELECT * FROM "user" WHERE "approved_user"=false;
    `;
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((err) => {
        res.send(500);
    });
});

router.get("/approved", (req, res) => {
    // Gets all approved users
    const queryText = `
      SELECT * FROM "user" WHERE "approved_user"=true;
    `;
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((err) => {
        res.send(500);
    });
});
module.exports = router;