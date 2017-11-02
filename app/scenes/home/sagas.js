import { put, takeLatest, call } from 'redux-saga/effects';
import { fetchAllFlags, deleteFlag } from '../../services/apis/flag.api';
import {
  FETCH_ALL_FLAGS_REQUESTED,
  FETCH_ALL_FLAGS_SUCCEEDED,
  FETCH_ALL_FLAGS_FAILED,
  DELETE_FLAG_REQUESTED,
  DELETE_FLAG_SUCCEEDED,
  DELETE_FLAG_FAILED
} from './constants';

function* fetchAllFlagsSaga() {
  try {
    const flags = yield call(fetchAllFlags);
    yield put({type: FETCH_ALL_FLAGS_SUCCEEDED, flags});
  } catch(error) {
    yield put({type: FETCH_ALL_FLAGS_FAILED, error});
  }
}

function* deleteFlagSaga(action) {
  try {
    const flagId = yield call(deleteFlag, action.id);
    yield put({type: DELETE_FLAG_SUCCEEDED, ...flagId});
  } catch(error) {
    yield put({type: DELETE_FLAG_FAILED, error});
  }
}

function* watchFetchAllFlagsSaga() {
  yield takeLatest('FETCH_ALL_FLAGS_REQUESTED', fetchAllFlagsSaga);
}

function* watchDeleteFlagSaga() {
  yield takeLatest('DELETE_FLAG_REQUESTED', deleteFlagSaga);
}
const flagSagas = [
  watchFetchAllFlagsSaga,
  watchDeleteFlagSaga
];
export default flagSagas;
