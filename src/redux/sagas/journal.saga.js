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

function* addJournalSaga(action) {
  try {
    const response = yield axios.post("/api/journal", {
      journal: action.payload,
    });
    yield put({ type: "FETCH_JOURNAL", payload: action.payload.user_id });
  } catch (error) {
    console.log("error adding event", error);
  }
}

function* updateJournalPrivacySaga(action) {
  try {
    yield axios.put(`/api/journal/privacy/${action.payload.journalId}`, {
      newPrivacy: action.payload.newPrivacy,
    });
    yield put({ type: "FETCH_JOURNAL", payload: action.payload.userId });
  } catch (error) {
    console.log("error in updating journal entry privacy", error);
  }
}

function* journalSaga() {
  yield takeLatest("UPDATE_JOURNAL_ENTRY_PRIVACY", updateJournalPrivacySaga);
  yield takeLatest("FETCH_JOURNAL", fetchJournalSaga);
  yield takeLatest("ADD_JOURNAL", addJournalSaga);
}

export default journalSaga;
