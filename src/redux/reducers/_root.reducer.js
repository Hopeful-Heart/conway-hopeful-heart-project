import { combineReducers } from "redux";
import errors from "./errors.reducer";
import user from "./user.reducer";
import events from "./events.reducer";
import journal from "./journal.reducer";
import admin from "./admin.reducer";
import message from "./message.reducer";
import userSearch from "./userSearch.reducer";
import connection from "./connections.reducer";
import personal from "./personal.reducer";
import states from "./states.reducer";
// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  events,
  journal,
  admin,
  message,
  userSearch,
  connection,
  personal,
  states,
});

export default rootReducer;
