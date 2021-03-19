import { combineReducers } from "redux";

const eventsListReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_EVENTS_LIST":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  eventsListReducer,
});