import { put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* SendPersonalMessagesSaga(action) {
  console.log(action.payload);
  try {
    yield axios.post("/api/personalMessages", action.payload);
    yield axios.post("/api/notify", action.payload);
  } catch (error) {
    console.log("error adding event", error);
  }
}

function* fetchPersonalMessagesSaga(action) {
  try {
    console.log("in fetch personalMessages", action.payload);
    const response = yield axios.get(`/api/personalMessages/${action.payload}`);
    yield put({ type: "SET_PERSONAL_MESSAGES", payload: response.data });
  } catch (error) {
    console.log("Error in fetching personalMessages", error);
  }
}

function* deletePersonalMessages(action) {
  console.log("in delete personal message", action.payload, action.payload.id);
  try {
    yield axios.delete(`/api/personalMessages/${action.payload.id}`);
    yield put({
      type: "FETCH_PERSONAL_MESSAGES",
      payload: action.payload.user_id,
    });
  } catch (error) {
    console.log("error deleting message", error);
  }
}

function* sendMessageAll(action) {
  console.log(action.payload);
  try {
    yield axios.post("/api/personalMessages", action.payload);
    yield axios.post("/api/notify/all", action.payload);
    yield put({ type: "FETCH_MESSAGES" });
  } catch (error) {
    console.log("error adding event", error);
  }
}

function* personalMessagesSaga() {
  yield takeLatest("DELETE_PERSONAL_MESSAGES", deletePersonalMessages);
  yield takeLatest("SEND_PERSONAL_MESSAGES", SendPersonalMessagesSaga);
  yield takeLatest("FETCH_PERSONAL_MESSAGES", fetchPersonalMessagesSaga);
}

export default personalMessagesSaga;
