const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

import sslRedirect from 'heroku-ssl-redirect';

const app = express();

const sessionMiddleware = require("./modules/session-middleware");
const passport = require("./strategies/user.strategy");

// Route includes
const personalMessagesRouter = require("./routes/personalMessages.router");
const messageRouter = require("./routes/message.router");
const userRouter = require("./routes/user.router");
const eventsRouter = require("./routes/events.router");
const journalRouter = require("./routes/journal.router");
const adminRouter = require("./routes/admin.router");
const notifyRouter = require("./routes/notify.router");
const userSearchRouter = require("./routes/userSearch.router");
const connectionRouter = require("./routes/connection.router");
// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use("/api/personalMessages", personalMessagesRouter);
app.use("/api/message", messageRouter);
app.use("/api/user", userRouter);
app.use("/api/events", eventsRouter);
app.use("/api/journal", journalRouter);
app.use("/api/admin", adminRouter);
app.use("/api/notify", notifyRouter);
app.use("/api/usersearch", userSearchRouter);
app.use("/api/connection", connectionRouter);
// Serve static files
app.use(express.static("build"));

//Redirect to HTTPS
app.use(sslRedirect());

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
