import { combineReducers } from "redux";

const approvedEventsListReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_APPROVED_EVENTS_LIST":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  approvedEventsListReducer,
});
