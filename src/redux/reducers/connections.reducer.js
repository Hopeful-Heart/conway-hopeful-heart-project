import {combineReducers} from "redux";

const connectionsReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_CONNECTIONS":
            return action.payload;
        default:
            return state;
    }
};


const allConnectionsReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_ALL_CONNECTIONS":
            return action.payload;
        default:
            return state;
    }
};

export default combineReducers({
    connectionsReducer,
    allConnectionsReducer,
});