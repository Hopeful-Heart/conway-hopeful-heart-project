import { combineReducers } from 'redux';

const pendingUsersReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_PENDING_USERS":
      return action.payload;
    default:
      return state;
  }
};

const approvedUsersReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_APPROVED_USERS":
      return action.payload;
    default:
      return state;
  }
}
export default combineReducers({
  pendingUsersReducer,
  approvedUsersReducer,
});

