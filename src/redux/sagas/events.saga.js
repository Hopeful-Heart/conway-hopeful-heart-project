import { put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchEventsSaga(action) {
  try {
    const response = yield axios.get("/api/events/");
    yield put({ type: "SET_EVENTS_LIST", payload: response.data });
  } catch (error) {
    console.log("Error in fetching events", error);
  }
}

function* addEventsSaga(action) {
  try {
    const response = yield axios.post("/api/events")
    yield put({ type: "FETCH_EVENTS", payload: response.data});
  } catch (error) {
    console.log("error adding event", error);
  }
}

function* eventsSaga() {
  yield takeLatest("FETCH_EVENTS", fetchEventsSaga);
  yield takeLatest("ADD_EVENT", addEventsSaga);
}

export default eventsSaga;
