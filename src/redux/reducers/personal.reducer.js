import { combineReducers } from "redux";

const personalMessagesReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_PERSONAL_MESSAGES":
      return action.payload;
    default:
      return state;
  }
};
export default combineReducers({
  personalMessagesReducer,
});
