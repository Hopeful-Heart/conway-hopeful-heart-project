import {
    put,
    takeLatest
} from "redux-saga/effects";
import axios from "axios";

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
}

export default journalSaga;