const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require("../modules/authentication-middleware");

router.post('/', rejectUnauthenticated, (req, res) => {
    let state = req.body.state;

    if (state === 'All States') {

    const queryText = `
        SELECT * FROM "user" WHERE "id" != ${req.user.id} ORDER BY "first_name";
    `
    pool.query(queryText).then((result) => {
        res.send(result.rows).status(200);
    }).catch((err)=> {
        res.sendStatus(500);
        console.log(err);
    })
    } else {

    const queryText = `
        SELECT * FROM "user" WHERE "state" = $1 AND "id" != ${req.user.id} ORDER BY "first_name";
    `
    pool.query(queryText, [state]).then((result) => {
        res.send(result.rows).status(200);
    }).catch((err) => {
        res.sendStatus(500);
        console.log(err);
    })

    }
});

module.exports = router;