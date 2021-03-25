import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);
    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  };
};

function* fetchPendingUsers(action) {
  try {
    const response = yield axios.get(`/api/admin/pending`)
    yield put({ type: 'SET_PENDING_USERS', payload: response.data })
  } catch (error) {
    console.log(error)
  };
};

function* fetchApprovedUsers(action) {
  try {
    const response = yield axios.get(`/api/admin/approved`)
    yield put({ type: 'SET_APPROVED_USERS', payload: response.data })
  } catch (error) {
    console.log(error)
  };
};

function* updatePendingUsers(action) {
  try {
    const update = yield axios.put(`/api/admin/pending/${action.payload.id}`)
    yield put({ type: 'FETCH_USER_LIST', payload: update.data })
  } catch (error) {
    console.log('error updating pending event!', error);
    console.log(action.payload);
  };
};

function* updateApprovedUsers(action) {
  try {
    const update = yield axios.put(`/api/admin/approved/${action.payload.id}`)
    yield put({ type: 'FETCH_USER_LIST', payload: update.data })
  } catch (error) {
    console.log('error updating approved event!', error);
  };
};

function* deletePendingUsers(action) {
  try {
    const update = yield axios.delete(`/api/admin/pending/${action.payload.id}`)
    yield put({ type: 'FETCH_USER_LIST', payload: update.data })
  } catch (error) {
    console.log('error updating approved event!', error);
  };
};

function* deleteApprovedUsers(action) {
  try {
    const update = yield axios.delete(`/api/admin/approved/${action.payload.id}`)
    yield put({ type: 'FETCH_USER_LIST', payload: update.data })
  } catch (error) {
    console.log('error updating approved event!', error);
  };
};

function* updateUserAuthorized(action) {
  try {
    yield axios.put(`/api/user/authorized/`, { boolean: action.payload });
    yield put({ type: 'FETCH_USER' });
  } catch (error) {
    console.log('Unable to update authorized user', error);
  };
};

function* updateParentInfo(action) {
  try {
    yield axios.put(`/api/user/parentinfo/`, { user: action.payload });
    yield put({ type: 'FETCH_USER' });
  } catch (error) {
    console.log('Unable to update parent info', error);
  };
};

function* updateChildInfo(action) {
  try {
    yield axios.put(`/api/user/childinfo/`, { user: action.payload });
    yield put({ type: 'FETCH_USER' });
  } catch (error) {
    console.log('Unable to update child info', error);
  };
};

function* fetchUserSearchList(action) {
  try {
    const response = yield axios.get(`/api/usersearch`)
    yield put({ type: 'SET_USER_SEARCH_LIST', payload: response.data })
  } catch (error) {
    console.log(error);
  };
};

function* fetchUserDetails(action) {
  try {
    const selectedUser= action.payload;
    yield put({ type: 'SET_USER_DETAILS', payload: selectedUser})
  } catch (error) {
    console.log(error)
  };
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('UPDATE_AUTHORIZED_USER', updateUserAuthorized);
  yield takeEvery('FETCH_USER_LIST', fetchPendingUsers);
  yield takeEvery('FETCH_USER_LIST', fetchApprovedUsers);
  yield takeEvery('UPDATE_PENDING_USER', updatePendingUsers);
  yield takeEvery('UPDATE_APPROVED_USER', updateApprovedUsers);
  yield takeEvery('DELETE_PENDING_USER', deletePendingUsers);
  yield takeEvery('DELETE_APPROVED_USER', deleteApprovedUsers);
  yield takeLatest('UPDATE_PARENT_INFO', updateParentInfo);
  yield takeLatest('UPDATE_CHILD_INFO', updateChildInfo);
  yield takeLatest('FETCH_USER_SEARCH_LIST', fetchUserSearchList);
  yield takeLatest('FETCH_USER_DETAILS', fetchUserDetails);
}


export default userSaga;
