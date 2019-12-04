import { call, put, takeLatest, delay } from 'redux-saga/effects';
import * as types from '../constants';
import API from '../services/RestaurantService';

function* restaurantTask(action) {
  const { payload } = action;
  const res = yield call(API.getRestaurantsWithSaga);
  if (res.data.restaurants) {
    const data = res.data.restaurants;
    yield put({
      type: types.FETCHING_RESTAURANT_SUCCESS,
      payload: {
        data,
      },
    });
  }
}

function* restaurantByIdTask(action) {
  const { payload } = action;
  console.log(payload);
  yield put({
    type: types.SHOW_LOADING,
  });
  const res = yield call(API.getRestaurantDetailWithSaga, payload.restaurantId);
  if (res.data.restaurantById) {
    const data = res.data.restaurantById;
    console.log(data);
    yield put({
      type: types.FETCHING_RESTAURANT_BY_ID_SUCCESS,
      payload: {
        data,
      },
    });
  }
  yield delay(1000);
  yield put({
    type: types.HIDE_LOADING,
  });
}

function* restaurantSaga() {
  yield takeLatest(types.FETCHING_RESTAURANT, restaurantTask);
  yield takeLatest(types.FETCHING_RESTAURANT_BY_ID, restaurantByIdTask);
}

export default restaurantSaga;
