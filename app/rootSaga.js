import "regenerator-runtime/runtime";
import flagSagas from './scenes/home/sagas';

const sagas = [
  flagSagas
]

export default function* RootSaga() {
  yield sagas.map(saga => fork(saga));
}
