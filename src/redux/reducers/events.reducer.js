import {
  combineReducers
} from "redux";

const recentEventsListReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_RECENT_EVENTS_LIST":
      return action.payload;
    default:
      return state;
  }
};

const approvedEventsListReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_APPROVED_EVENTS_LIST":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  recentEventsListReducer,
  approvedEventsListReducer,
});