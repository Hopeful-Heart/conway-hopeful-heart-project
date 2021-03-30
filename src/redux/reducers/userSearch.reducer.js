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

const usStateReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_US_STATE':
            return action.payload;
        case 'SET_ALL_STATES':
            return 'All States';
        default:
            return state;
    }
};

export default combineReducers({
    userSearchListReducer,
    userDetailsReucer,
    usStateReducer,
});
