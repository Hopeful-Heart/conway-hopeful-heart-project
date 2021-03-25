import { combineReducers } from "redux";

const userSearchListReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_USER_SEARCH_LIST":
            return action.payload;
        default:
            return state;
    }
};

const userDetailsReucer = (state = [], action) => {
    switch (action.type) {
        case "SET_USER_DETAILS":
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    userSearchListReducer,
    userDetailsReucer,
});
