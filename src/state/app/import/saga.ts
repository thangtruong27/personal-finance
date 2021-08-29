import { takeEvery } from 'redux-saga/effects';
import { actionTypes, importAction } from './actions';

function* importFileSaga(action: importAction) {}

export default function* importWatcher() {
  yield takeEvery(actionTypes.IMPORT_FILE, importFileSaga);
}
