import { combineReducers } from "redux";

const journalListReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_JOURNAL_LIST":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  journalListReducer,
});
