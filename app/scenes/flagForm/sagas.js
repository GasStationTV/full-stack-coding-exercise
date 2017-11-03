import { put, takeLatest, call } from 'redux-saga/effects';
import { newFlag, updateFlag, fetchFlag } from '../../services/apis/flag.api';
import {
  FETCH_SINGLE_FLAG_REQUESTED,
  FETCH_SINGLE_FLAG_SUCEEEDED,
  FETCH_SINGLE_FLAG_FAILED,
  UPDATE_SINGLE_FLAG_REQUESTED,
  UPDATE_SINGLE_FLAG_SUCEEEDED,
  UPDATE_SINGLE_FLAG_FAILED,
  CREATE_FLAG_REQUESTED,
  CREATE_FLAG_SUCEEEDED,
  CREATE_FLAG_FAILED
} from './constants';

function* fetchFlagSaga(action) {
  try {
    const flag = yield call(fetchFlag, action.id);
    yield put({type: FETCH_SINGLE_FLAG_SUCEEEDED, flag});
  } catch(error) {
    yield put({type: FETCH_SINGLE_FLAG_FAILED, error});
  }
}

function* updateFlagSaga(action) {
  try {
    yield call(updateFlag, action.data, action.id);
    yield put({type: UPDATE_SINGLE_FLAG_SUCEEEDED});
  } catch(error) {
    yield put({type: UPDATE_SINGLE_FLAG_FAILED, error});
  }
}

function* newFlagSaga(action) {
  try {
    yield call(newFlag, action.data);
    yield put({type: CREATE_FLAG_SUCEEEDED});
  } catch(error) {
    yield put({type: CREATE_FLAG_FAILED, error});
  }
}

function* watchFetchFlagSaga() {
  yield takeLatest('FETCH_SINGLE_FLAG_REQUESTED', fetchFlagSaga);
}

function* watchUpdateFlagSaga() {
  yield takeLatest('UPDATE_SINGLE_FLAG_REQUESTED', updateFlagSaga);
}

function* watchNewFlagSaga() {
  yield takeLatest('CREATE_FLAG_REQUESTED', newFlagSaga);
}
const flagFormSagas = [
  watchFetchFlagSaga,
  watchUpdateFlagSaga,
  watchNewFlagSaga
];
export default flagFormSagas;
