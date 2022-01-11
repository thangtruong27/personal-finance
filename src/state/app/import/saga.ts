import { takeEvery, put } from 'redux-saga/effects';
import { actionTypes, importAction, setData, setStatus } from './actions';
import { processData } from '../../../helpers/processData';
import { getDataFromXlsx } from '../../../helpers/processFile';
import { push } from 'connected-react-router';
import { Status } from './reducer';

function waitFor(time: number) {
  return new Promise((resolve) => { 
    setTimeout(resolve, time);
  });
}

function* importFileSaga(action: importAction) {
  const { fileRef } = action.payload;
  if (!fileRef) {
    return;
  }
  
  yield put(setStatus(Status.LOADING));

  const fileData: unknown[] = yield getDataFromXlsx(fileRef);
  const normalizedData = processData(fileData);
  yield waitFor(6000);

  yield put(setData(normalizedData));
  yield put(push('/dashboard'));
}

export default function* importWatcher() {
  yield takeEvery(actionTypes.IMPORT_FILE, importFileSaga);
}
