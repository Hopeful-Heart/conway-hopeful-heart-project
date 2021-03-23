import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchJournalSaga(action) {
  try {
    const response = yield axios.get(`/api/journal/${action.payload}`);
    yield put({ type: "SET_JOURNAL_LIST", payload: response.data });
  } catch (error) {
    console.log("Error in fetching journal", error);
  }
}

function* journalSaga() {
  yield takeLatest("FETCH_JOURNAL", fetchJournalSaga);
}

export default journalSaga;