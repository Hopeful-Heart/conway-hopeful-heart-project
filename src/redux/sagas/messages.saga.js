import { put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* addMessagesSaga(action) {
  console.log(action.payload);
  try {
    yield axios.post("/api/message", action.payload);
    yield axios.post("/api/notify", action.payload);
    yield put({ type: "FETCH_MESSAGES" });
  } catch (error) {
    console.log("error adding event", error);
  }
}

function* fetchMessagesSaga(action) {
  try {
    const response = yield axios.get(`/api/message`);
    yield put({ type: "SET_MESSAGES", payload: response.data });
  } catch (error) {
    console.log("Error in fetching messages", error);
  }
}

function* deleteMessage(action) {
  try {
    yield axios.delete(`/api/message/${action.payload.id}`);
    yield put({ type: "FETCH_MESSAGES" });
  } catch (error) {
    console.log("error deleting message", error);
  }
}

function* sendMessageAll(action) {
  console.log(action.payload);
  try {
    yield axios.post("/api/message", action.payload);
    yield axios.post("/api/notify/all", action.payload);
    yield put({ type: "FETCH_MESSAGES" });
  } catch (error) {
    console.log("error adding event", error);
  }
}

function* messagesSaga() {
  yield takeLatest("SEND_MESSAGE_ALL", sendMessageAll);
  yield takeLatest("DELETE_MESSAGE", deleteMessage);
  yield takeLatest("ADD_MESSAGE", addMessagesSaga);
  yield takeLatest("FETCH_MESSAGES", fetchMessagesSaga);
}

export default messagesSaga;
