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

const pendingEventsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_PENDING_EVENTS":
      return action.payload;
    default:
      return state;
  }
}

const approvedEventsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_APPROVED_EVENTS":
      return action.payload;
    default:
      return state;
  }
}
export default combineReducers({
  pendingUsersReducer,
  approvedUsersReducer,
  pendingEventsReducer,
  approvedEventsReducer,
});

