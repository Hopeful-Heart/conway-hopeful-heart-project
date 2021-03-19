import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchEventsSaga(action) {
  try {
    const response = yield axios.get("/api/events/");
    yield put({ type: "SET_EVENTS_LIST", payload: response.data });
  } catch (error) {
    console.log("Error in fetching events", error);
  }
}

function* eventsSaga() {
  yield takeLatest("FETCH_EVENTS", fetchEventsSaga);
}

export default eventsSaga;
