const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

// app.use (function (req, res, next) {
//   if (req.secure) {
//           // request was via https, so do no special handling
//           next();
//   } else {
//           // request was via http, so redirect to https
//           res.redirect('https://' + req.headers.host + req.url);
//   }
// });

const forceSsl = function (req, res, next) {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(['https://', req.get("Host"), req.url].join(''));
  }
  return next();
};

app.configure(function () {
  if (process.env.NODE_ENV === "production") {
    app.use(forceSsl);
  }
})

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

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
