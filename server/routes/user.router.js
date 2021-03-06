const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");

const router = express.Router();

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post("/register", (req, res) => {
  const user = req.body;
  const password = encryptLib.encryptPassword(user.password);
  const queryText = `INSERT INTO "user" ("email", "password", "first_name", "last_name", "profile_pic", "phone", "state", "city")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING "id"`;
  pool
    .query(queryText, [
      user.email,
      password,
      user.firstName,
      user.lastName,
      user.pic,
      user.phone,
      user.state,
      user.city,
    ])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log("User registration failed: ", err);
      res.sendStatus(500);
    });
});
// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post("/login", userStrategy.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post("/logout", (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

// Handles Ajax request for user information if user is authenticated
router.get("/", rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

router.get("/:id", rejectUnauthenticated, (req, res) => {
  // Gets a user by id
  const sqlQuery = `SELECT * FROM "user" WHERE "id" = $1;`;
  pool
    .query(sqlQuery, [req.params.id])
    .then((response) => {
      console.log("Retrived user successfully");
      res.send(response.rows).status(200);
    })
    .catch((err) => {
      console.log("Error in getting user by id", err);
      res.sendStatus(500);
    });
});

router.put("/parentinfo", rejectUnauthenticated, (req, res) => {
  // Updates the parent info columns of user table
  let user = req.body.user;

  const sqlQuery = `UPDATE "user" SET "email" = $1, "first_name" = $2, "last_name" = $3, "profile_pic" = $4, "phone" = $5, "state" = $6, "city" = $7 WHERE "id" = $8;`;
  console.log(user);
  pool
    .query(sqlQuery, [
      user.email,
      user.firstName,
      user.lastName,
      user.pic,
      user.phone,
      user.state,
      user.city,
      req.user.id,
    ])
    .then(() => {
      console.log("Updated authorized user successfully");
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log("Error in updating authorized user", err);
      res.sendStatus(500);
    });
});

router.put("/childinfo", rejectUnauthenticated, (req, res) => {
  // Updates the child info columns of user table
  let user = req.body.user;

  const sqlQuery = `UPDATE "user" SET "birthday" = $1, "child_first_name" = $2, "child_last_name" = $3, "second_photo" = $4, "memorial_day" = $5, "story" = $6, "memorial" = 'TRUE' WHERE "id" = $7;`;

  pool
    .query(sqlQuery, [
      user.birthday,
      user.firstName,
      user.lastName,
      user.pic,
      user.memorialDay,
      user.story,
      req.user.id,
    ])
    .then(() => {
      console.log("Updated authorized user successfully");
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log("Error in updating authorized user", err);
      res.sendStatus(500);
    });
});

router.put("/token/:id", rejectUnauthenticated, (req, res) => {
  // Updates the parent info columns of user table
  let token = req.body.client_token;
  const id = req.params.id;

  const sqlQuery = `UPDATE "user" SET "client_token" = $1 WHERE "id" = $2;`;
  pool
    .query(sqlQuery, [req.body.client_token, id])
    .then(() => {
      console.log("Updated authorized user successfully");
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log("Error in updating authorized user", err);
      res.sendStatus(500);
    });
});

router.get("/token/:id", rejectUnauthenticated, (req, res) => {
  // Gets a user by id
  const sqlQuery = `SELECT "client_token" FROM "user" WHERE "id" = $1;`;
  pool
    .query(sqlQuery, [req.params.id])
    .then((response) => {
      console.log("Retrived user successfully");
      res.send(response.rows).status(200);
    })
    .catch((err) => {
      console.log("Error in getting user by id", err);
      res.sendStatus(500);
    });
});

module.exports = router;
