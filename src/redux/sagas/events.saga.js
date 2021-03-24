import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchCalendarEventsSaga() {
  try {
    const response = yield axios.get("/api/events/approved");
    yield put({ type: "SET_EVENTS_LIST", payload: response.data });
  } catch (error) {
    console.log("Error in fetching events", error);
  }
}

function* addEventsSaga(action) {
  try {
    yield axios.post("/api/events", action.payload);
    yield put({ type: "FETCH_EVENTS" });
  } catch (error) {
    console.log("error adding event", error);
  }
}

function* eventsSaga() {
  yield takeLatest("FETCH_CALENDAR_EVENTS", fetchCalendarEventsSaga);
  yield takeLatest("ADD_EVENT", addEventsSaga);
}

export default eventsSaga;
