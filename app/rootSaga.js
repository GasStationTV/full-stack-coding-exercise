import { fork } from 'redux-saga/effects';
import flagSagas from './scenes/home/sagas';
import flagFormSagas from './scenes/flagForm/sagas';

const sagas = [
  ...flagSagas,
  ...flagFormSagas
]

export default function* RootSaga() {
  yield sagas.map(saga => fork(saga));
}
