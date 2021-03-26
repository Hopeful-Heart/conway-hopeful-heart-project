const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require("../modules/authentication-middleware");

router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText = `
        SELECT * FROM "user" ORDER BY "first_name";
    `
    pool.query(queryText).then((result) => {
        res.send(result.rows).status(200);
    }).catch((err)=> {
        res.sendStatus(500);
        console.log(err);
    })
});

module.exports = router;