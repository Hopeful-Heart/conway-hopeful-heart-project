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


function* fetchAllConnections(action) {
    try {
        const response = yield axios.get(`/api/connection/all`);
        yield put({
            type: "SET_ALL_CONNECTIONS",
            payload: response.data
        });
    } catch (error) {
        console.log("Error in fetching all connections", error);
    }
}


function* addConnection(action) {
    try {
        yield axios.post("/api/connection", {
            connection: action.payload
        })
        yield put ({ type: "FETCH_ALL_CONNECTIONS" });
    } catch (error) {
        console.log("error adding connection", error);
    }
}

function* approveConnection(action) {
    try {
        yield axios.put(`/api/connection/${action.payload.id}`);
        yield put({
            type: "FETCH_CONNECTIONS",
            payload: action.payload
        });
    } catch (error) {
        console.log("error updating connection", error);
    }
}

function* dismissConnection(action) {
    try {
        yield axios.delete(`/api/connection/${action.payload.id}`)
        yield put({
            type: "FETCH_CONNECTIONS",
            payload: action.payload
        });
    } catch (error) {
        console.log("error deleting connection", error);
    }
}

function* journalSaga() {
    yield takeLatest("ADD_CONNECTION", addConnection);
    yield takeLatest("FETCH_CONNECTIONS", fetchConnections);
    yield takeLatest("FETCH_ALL_CONNECTIONS", fetchAllConnections);
    yield takeLatest("APPROVE_CONNECTION", approveConnection);
    yield takeLatest("DISMISS_CONNECTION", dismissConnection);
}

export default journalSaga;