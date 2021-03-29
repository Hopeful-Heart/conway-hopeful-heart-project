import {
    put,
    takeLatest
} from "redux-saga/effects";
import axios from "axios";

function* fetchConnections(action) {
    try {
        const response = yield axios.get(`/api/connection/${action.payload.user}`);
        yield put({
            type: "SET_CONNECTIONS",
            payload: response.data
        });
    } catch (error) {
        console.log("Error in fetching connections", error);
    }
}


function* addConnection(action) {
    try {
        yield axios.post("/api/connection", {
            connection: action.payload
        })
    } catch (error) {
        console.log("error adding connection", error);
    }
}

function* journalSaga() {
    yield takeLatest("ADD_CONNECTION", addConnection);
    yield takeLatest("FETCH_CONNECTIONS", fetchConnections);
}

export default journalSaga;