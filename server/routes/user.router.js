const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const user = req.body;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" ("email", "password", "first-name", "last-name", "profile-pic", "phone", "state", "city")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING "id"`;
  pool
    .query(queryText, [user.email, password, user.firstName, user.lastName, user.pic, user.phone, user.state, user.city])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

router.get('/allusers', rejectUnauthenticated, (req, res) => {
  // Gets all users from db to be shown in the search list of users
  const sqlQuery = `SELECT * FROM "user";`;

  pool.query(sqlQuery).then(response => {
    console.log('Retrieved users successfully');
    res.send(response.rows).status(200);
  }).catch(err => {
    console.log('Error in getting users', err);
    res.sendStatus(500);
  });
});

module.exports = router;
