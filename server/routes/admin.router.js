const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/pending", rejectUnauthenticated, (req, res) => {
  // Gets all pending users

  if (!req.user.admin_user) {
    console.log("Not an admin!");

    return;
  }

  const queryText = `
      SELECT * FROM "user" WHERE "approved_user"=false;
    `;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      res.send(500);
    });
});

router.put("/pending/:id", rejectUnauthenticated, (req, res) => {
  if (!req.user.admin_user) {
    console.log("Not an admin!");

    return;
  }

  const queryText = `
    UPDATE "user" SET "approved_user" = 'true' WHERE "user"."id"=$1;
    `;
  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      res.send(result.rows).status(204);
    })
    .catch((err) => {
      res.send(err).status(500);
    });
});

router.delete("/pending/:id", rejectUnauthenticated, (req, res) => {
  // Deletes an event by id

  if (!req.user.admin_user) {
    console.log("Not an admin!");

    return;
  }

  const queryText = ` 
      DELETE FROM "user" WHERE "id"=$1;
    `;
  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      res.sendStatus(204);
    })
    .catch((err) => {
      res.send(err).status(500);
    });
});

router.get("/approved", rejectUnauthenticated, (req, res) => {
  // Gets all approved users

  if (!req.user.admin_user) {
    console.log("Not an admin!");

    return;
  }

  const queryText = `
      SELECT * FROM "user" WHERE "approved_user"=true;
    `;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      res.send(500);
    });
});

router.put("/approved/:id", rejectUnauthenticated, (req, res) => {
  if (!req.user.admin_user) {
    console.log("Not an admin!");

    return;
  }

  const queryText = `
    UPDATE "user" SET "approved_user" = 'false' WHERE "user"."id"=$1;
    `;
  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      res.send(result.rows).status(204);
    })
    .catch((err) => {
      res.send(err).status(500);
    });
});

router.delete("/approved/:id", rejectUnauthenticated, (req, res) => {
  // Deletes an event by id

  if (!req.user.admin_user) {
    console.log("Not an admin!");

    return;
  }

  const queryText = ` 
      DELETE FROM "user" WHERE "id"=$1;
    `;
  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      res.sendStatus(204);
    })
    .catch((err) => {
      res.send(err).status(500);
    });
});

router.get("/events/pending", rejectUnauthenticated, (req, res) => {
  // Gets all events

  if (!req.user.admin_user) {
    console.log("Not an admin!");

    return;
  }

  const queryText = `
    SELECT "events"."id", "events"."name", "events"."date","events"."location","events"."description","events"."type","events"."link","user"."first_name","user"."last_name" FROM "events"
    JOIN "user" ON "events"."user_id" = "user"."id"
    WHERE "admin_approved" = 'false';`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows).status(200);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

router.put("/events/pending/:id", rejectUnauthenticated, (req, res) => {
  if (!req.user.admin_user) {
    console.log("Not an admin!");

    return;
  }

  const queryText = `
    UPDATE "events" SET "admin_approved" = 'true' WHERE "events"."id"=$1;
    `;
  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      res.send(result.rows).status(204);
    })
    .catch((err) => {
      res.send(err).status(500);
    });
});

router.delete("/events/pending/:id", rejectUnauthenticated, (req, res) => {
  // Deletes an event by id

  if (!req.user.admin_user) {
    console.log("Not an admin!");

    return;
  }

  const queryText = ` 
      DELETE FROM "events" WHERE "id"=$1;
    `;
  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      res.sendStatus(204);
    })
    .catch((err) => {
      res.send(err).status(500);
    });
});

router.get("/events/approved", rejectUnauthenticated, (req, res) => {
  if (!req.user.admin_user) {
    console.log("Not an admin!");

    return;
  }

  const queryText = `
        SELECT "events"."id", "events"."name", "events"."date","events"."location","events"."description","events"."type","events"."link","user"."first_name","user"."last_name" FROM "events"
	    JOIN "user" ON "events"."user_id" = "user"."id"
	    WHERE "admin_approved" = 'true';`;
  pool
    .query(queryText)
    .then((response) => {
      console.log("Retrieved admin_approved events successfully");
      res.send(response.rows).status(200);
    })
    .catch((err) => {
      console.log("Error in getting admin approved events", err);
      res.sendStatus(500);
    });
});

router.put("/events/approved/:id", rejectUnauthenticated, (req, res) => {
  if (!req.user.admin_user) {
    console.log("Not an admin!");

    return;
  }

  const queryText = `
    UPDATE "events" SET "admin_approved" = 'false' WHERE "events"."id"=$1;
    `;
  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      res.send(result.rows).status(204);
    })
    .catch((err) => {
      res.send(500);
    });
});

router.delete("/events/approved/:id", rejectUnauthenticated, (req, res) => {
  // Deletes an event by id

  if (!req.user.admin_user) {
    console.log("Not an admin!");

    return;
  }

  const queryText = ` 
      DELETE FROM "events" WHERE "id"=$1;
    `;
  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      res.sendStatus(204);
    })
    .catch((err) => {
      res.send(err).status(500);
    });
});

module.exports = router;
