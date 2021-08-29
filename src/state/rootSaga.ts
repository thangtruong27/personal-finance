import { all, fork } from 'redux-saga/effects';
import importSagas from './app/import/saga';

export default function* sagas() {
  yield all([fork(importSagas)]);
}
