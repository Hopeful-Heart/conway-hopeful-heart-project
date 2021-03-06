import axios from "axios";
import { put, takeEvery, takeLatest } from "redux-saga/effects";

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get("/api/user", config);
    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: "SET_USER", payload: response.data });
  } catch (error) {
    console.log("User get request failed", error);
  }
}

function* updateUserToken(action) {
  const client_token = action.payload;
  const id = action.payload.id;
  try {
    yield axios.put(`/api/user/token/${id}`, client_token);
  } catch (error) {
    console.log("Unable to update authorized user", error);
  }
}

function* fetchAdminUsers(action) {
  try {
    const response = yield axios.get(`/api/admin/adminUsers`);
    yield put({ type: "SET_ADMIN_USERS", payload: response.data });
  } catch (error) {
    console.log(error);
  }
}

function* updateNonAdminUser(action) {
  try {
    const response = yield axios.put(`/api/admin/promoteUser/${action.payload.id}`)
    yield put({ type: "FETCH_USER_LIST", payload: response.data });
  } catch (error) {
    console.log(error);
  }
}

function* updateAdminUser(action) {
  try {
    const response = yield axios.put(`/api/admin/demoteUser/${action.payload.id}`)
    yield put({ type: "FETCH_USER_LIST", payload: response.data });
  } catch (error) {
    console.log(error);
  }
}

function* fetchPendingUsersAdmin(action) {
  try {
    const response = yield axios.get(`/api/admin/pending`);
    yield put({ type: "SET_PENDING_USERS_ADMIN", payload: response.data });
  } catch (error) {
    console.log(error);
  }
}

function* fetchApprovedUsersAdmin(action) {
  try {
    const response = yield axios.get(`/api/admin/approved`);
    yield put({ type: "SET_APPROVED_USERS_ADMIN", payload: response.data });
  } catch (error) {
    console.log(error);
  }
}

function* updatePendingUsersAdmin(action) {
  try {
    const update = yield axios.put(`/api/admin/pending/${action.payload.id}`);
    yield put({ type: "FETCH_USER_LIST", payload: update.data });
  } catch (error) {
    console.log("error updating pending event!", error);
  }
}

function* updateApprovedUsersAdmin(action) {
  try {
    const update = yield axios.put(`/api/admin/approved/${action.payload.id}`);
    yield put({ type: "FETCH_USER_LIST", payload: update.data });
  } catch (error) {
    console.log("error updating approved event!", error);
  }
}

function* deletePendingUsersAdmin(action) {
  try {
    const update = yield axios.delete(
      `/api/admin/pending/${action.payload.id}`
    );
    yield put({ type: "FETCH_USER_LIST", payload: update.data });
  } catch (error) {
    console.log("error updating approved event!", error);
  }
}

function* deleteApprovedUsersAdmin(action) {
  try {
    const update = yield axios.delete(
      `/api/admin/approved/${action.payload.id}`
    );
    yield put({ type: "FETCH_USER_LIST", payload: update.data });
  } catch (error) {
    console.log("error updating approved event!", error);
  }
}

function* updateParentInfo(action) {
  try {
    yield axios.put(`/api/user/parentinfo/`, { user: action.payload });
    yield put({ type: "FETCH_USER" });
  } catch (error) {
    console.log("Unable to update parent info", error);
  }
}

function* updateChildInfo(action) {
  try {
    yield axios.put(`/api/user/childinfo/`, { user: action.payload });
    yield put({ type: "FETCH_USER" });
  } catch (error) {
    console.log("Unable to update child info", error);
  }
}

function* getUserTokenById(action) {
  const client_token = action.payload;
  const id = action.payload.id;
  try {
    const response = yield axios.get(`/api/user/token/${id}`, client_token);
    yield put({ type: "SET_TOKEN_BYID", payload: response.data });
  } catch (error) {
    console.log(error);
  }
}

function* fetchUserSearchList(action) {
  try {
    const response = yield axios.post(`/api/usersearch/`, {
      state: action.payload.state,
    });
    yield put({ type: "SET_USER_SEARCH_LIST", payload: response.data });
  } catch (error) {
    console.log(error);
  }
}

function* fetchUserDetails(action) {
  try {
    const selectedUser = action.payload;
    yield put({ type: "SET_USER_DETAILS", payload: selectedUser });
  } catch (error) {
    console.log(error);
  }
}

function* userSaga() {
  yield takeLatest("FETCH_TOKEN", updateUserToken);
  yield takeLatest("GET_TOKEN_BYID", getUserTokenById);
  yield takeLatest("FETCH_USER", fetchUser);
  yield takeEvery("FETCH_USER_LIST", fetchPendingUsersAdmin);
  yield takeEvery("FETCH_USER_LIST", fetchApprovedUsersAdmin);
  yield takeEvery("UPDATE_PENDING_USER", updatePendingUsersAdmin);
  yield takeEvery("UPDATE_APPROVED_USER", updateApprovedUsersAdmin);
  yield takeEvery("DELETE_PENDING_USER", deletePendingUsersAdmin);
  yield takeEvery("DELETE_APPROVED_USER", deleteApprovedUsersAdmin);
  yield takeLatest("UPDATE_PARENT_INFO", updateParentInfo);
  yield takeLatest("UPDATE_CHILD_INFO", updateChildInfo);
  yield takeLatest("FETCH_USER_SEARCH_LIST", fetchUserSearchList);
  yield takeLatest("FETCH_USER_DETAILS", fetchUserDetails);
  yield takeLatest("UPDATE_ADMIN_USER", updateAdminUser);
  yield takeLatest("FETCH_ADMIN_USERS", fetchAdminUsers);
  yield takeLatest("UPDATE_ADMIN_USER", updateAdminUser);
  yield takeLatest("UPDATE_NONADMIN_USER", updateNonAdminUser);
}

export default userSaga;
