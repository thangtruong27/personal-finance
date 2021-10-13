import { takeEvery, put } from 'redux-saga/effects';
import { actionTypes, importAction, setData } from './actions';
import processData from '../../../helpers/processData';
import { getDataFromXlsx } from '../../../helpers/processFile';

function* importFileSaga(action: importAction) {
  const { fileRef } = action.payload;
  if (!fileRef) {
    return;
  }
  //@ts-ignore
  const fileData = yield getDataFromXlsx(fileRef);
  const normalizedData = processData(fileData); 
  yield put(setData(normalizedData));
}

export default function* importWatcher() {
  yield takeEvery(actionTypes.IMPORT_FILE, importFileSaga);
}
