import "regenerator-runtime/runtime";
import { put, takeLatest } from 'redux-saga/effects';
import { fetchAllFlags, deleteFlag } from '../../services/apis/flag.api';
import {
  FETCH_ALL_FLAGS_REQUESTED,
  FETCH_ALL_FLAGS_SUCCEEDED,
  FETCH_ALL_FLAGS_FAILED
} from './constants';

function* fetchAllFlagsSaga() {
  try {
    const flags = yield call(fetchAllFlags);
    yield put({type: FETCH_ALL_FLAGS_SUCCEEDED, flags});
  } catch(error) {
    yield put({type: FETCH_ALL_FLAGS_FAILED, error});
  }
}

function* watchFetchAllFlagsSaga() {
  yield takeLatest('FETCH_ALL_FLAGS_REQUESTED', fetchAllFlagsSaga);
}

export default [
  watchFetchAllFlagsSaga
]
