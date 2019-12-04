/* eslint-disable no-undef */
/* eslint-disable no-alert */
import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { navigate } from '../services/NavigationService';
import * as types from '../constants';
import API from '../services/AuthService';

function* taskAuth(action) {
  const { payload } = action;
  const res = yield call(API.login2, payload.email, payload.password);
  yield put({
    type: types.SHOW_LOADING,
  });
  if (res.errors) {
    const { message } = res.errors[0];
    yield put({
      type: types.LOGIN_ERROR,
      payload: {
        error: message,
      },
    });
    yield delay(1500);
    yield put({
      type: types.HIDE_LOADING,
    });
    alert(res.errors[0].message);
    // alert(message);
  } else if (res.data.login) {
    const { userId, authToken } = res.data.login;
    yield put({
      type: types.LOGIN_SUCCESS,
      payload: {
        userId,
        authToken,
      },
    });
    yield delay(1500);
    yield put({
      type: types.HIDE_LOADING,
    });
    navigate('Main', { a: 'a' });
  }
}

function* authSaga() {
  yield takeLatest(types.LOGIN, taskAuth);
}

export default authSaga;
