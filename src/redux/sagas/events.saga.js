import { put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchApprovedEventsSaga() {
  try {
    const response = yield axios.get("/api/events/approved");
    yield put({ type: "SET_APPROVED_EVENTS_LIST", payload: response.data });
  } catch (error) {
    console.log("Error in fetching events", error);
  }
}

function* addEventsSaga(action) {
  try {
    yield axios.post("/api/events", action.payload);
    yield put({ type: "FETCH_APPROVED_EVENTS" });
  } catch (error) {
    console.log("error adding event", error);
  }
}

function* fetchPendingEventsAdmin(action) {
  try {
    const response = yield axios.get(`/api/admin/events/pending`)
    yield put({ type: 'SET_PENDING_EVENTS_ADMIN', payload: response.data })
  } catch (error) {
    console.log(error)
  };
};

function* fetchApprovedEventsAdmin(action) {
  try {
    const response = yield axios.get(`/api/admin/events/approved`)
    yield put({ type: 'SET_APPROVED_EVENTS_ADMIN', payload: response.data })
  } catch (error) {
    console.log(error)
  };
};

function* updatePendingEventsAdmin(action) {
  try {
      const update = yield axios.put(`/api/admin/events/pending/${action.payload.id}`)
      yield put ({ type: 'FETCH_EVENTS_LIST', payload:update.data})
      yield put({ type: "FETCH_APPROVED_EVENTS" });
  } catch(error) {
      console.log('error updating pending event!', error);
      console.log(action.payload);
  }
}

function* updateApprovedEventsAdmin(action) {
  try {
      const update = yield axios.put(`/api/admin/events/approved/${action.payload.id}`)
      yield put ({ type: 'FETCH_EVENTS_LIST', payload:update.data})
      yield put({ type: "FETCH_APPROVED_EVENTS" });
  } catch(error) {
      console.log('error updating approved event!', error);
  }
}

function* deletePendingEventsAdmin(action) {
  try {
      const update = yield axios.delete(`/api/admin/events/pending/${action.payload.id}`)
      yield put ({ type: 'FETCH_EVENTS_LIST', payload:update.data})
      yield put({ type: "FETCH_APPROVED_EVENTS" });
  } catch(error) {
      console.log('error updating approved event!', error);
  }
}

function* deleteApprovedEventsAdmin(action) {
  try {
      const update = yield axios.delete(`/api/admin/events/approved/${action.payload.id}`)
      yield put ({ type: 'FETCH_EVENTS_LIST', payload:update.data})
      yield put({ type: "FETCH_APPROVED_EVENTS" });
  } catch(error) {
      console.log('error updating approved event!', error);
  }
}

function* eventsSaga() {
  yield takeLatest("FETCH_APPROVED_EVENTS", fetchApprovedEventsSaga);
  yield takeLatest("ADD_EVENT", addEventsSaga);
  yield takeEvery("FETCH_EVENTS_LIST", fetchApprovedEventsAdmin);
  yield takeEvery("FETCH_EVENTS_LIST", fetchPendingEventsAdmin);
  yield takeEvery("UPDATE_PENDING_EVENT", updatePendingEventsAdmin);
  yield takeEvery("UPDATE_APPROVED_EVENT", updateApprovedEventsAdmin);
  yield takeEvery("DELETE_PENDING_EVENT", deletePendingEventsAdmin);
  yield takeEvery("DELETE_APPROVED_EVENT", deleteApprovedEventsAdmin);
}

export default eventsSaga;
