import { put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* sendNotification(action) {
  try {
    yield axios.post("/api/notify", action.payload);
  } catch (error) {
    console.log("error Sending Notification", error);
  }
}

function* sendUrgentNotification(action) {
  try {
    yield axios.post("/api/notify/Urgent", action.payload);
  } catch (error) {
    console.log("error Sending Notification", error);
  }
}

function* notifySaga() {
  yield takeLatest("SEND_NOTIFY", sendNotification);
  yield takeLatest("SEND_URGENT", sendUrgentNotification);
}

export default notifySaga;
