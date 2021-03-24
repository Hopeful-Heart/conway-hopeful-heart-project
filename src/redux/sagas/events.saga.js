import { put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchEventsSaga(action) {
  try {
    const response = yield axios.get("/api/events");
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

function* fetchPendingEvents(action) {
  try {
    const response = yield axios.get(`/api/admin/events/pending`)
    yield put({ type: 'SET_PENDING_EVENTS', payload: response.data })
  } catch (error) {
    console.log(error)
  };
};

function* fetchApprovedEvents(action) {
  try {
    const response = yield axios.get(`/api/admin/events/approved`)
    yield put({ type: 'SET_APPROVED_EVENTS', payload: response.data })
  } catch (error) {
    console.log(error)
  };
};

function* updatePendingEvents(action) {
  try {
      const update = yield axios.put(`/api/admin/events/pending/${action.payload.id}`)
      yield put ({ type: 'FETCH_EVENTS_LIST', payload:update.data})
  } catch(error) {
      console.log('error updating pending event!', error);
      console.log(action.payload);
  }
}

function* updateApprovedEvents(action) {
  try {
      const update = yield axios.put(`/api/admin/events/approved/${action.payload.id}`)
      yield put ({ type: 'FETCH_EVENTS_LIST', payload:update.data})
  } catch(error) {
      console.log('error updating approved event!', error);
  }
}

function* deletePendingEvents(action) {
  try {
      const update = yield axios.delete(`/api/admin/events/pending/${action.payload.id}`)
      yield put ({ type: 'FETCH_EVENTS_LIST', payload:update.data})
  } catch(error) {
      console.log('error updating approved event!', error);
  }
}

function* deleteApprovedEvents(action) {
  try {
      const update = yield axios.delete(`/api/admin/events/approved/${action.payload.id}`)
      yield put ({ type: 'FETCH_EVENTS_LIST', payload:update.data})
  } catch(error) {
      console.log('error updating approved event!', error);
  }
}

function* eventsSaga() {
  yield takeLatest("FETCH_EVENTS", fetchEventsSaga);
  yield takeLatest("ADD_EVENT", addEventsSaga);
  yield takeEvery("FETCH_EVENTS_LIST", fetchApprovedEvents);
  yield takeEvery("FETCH_EVENTS_LIST", fetchPendingEvents);
  yield takeEvery("UPDATE_PENDING_EVENT", updatePendingEvents);
  yield takeEvery("UPDATE_APPROVED_EVENT", updateApprovedEvents);
  yield takeEvery("DELETE_PENDING_EVENT", deletePendingEvents);
  yield takeEvery("DELETE_APPROVED_EVENT", deleteApprovedEvents);
}

export default eventsSaga;
