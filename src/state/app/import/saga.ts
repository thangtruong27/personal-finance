import { takeEvery } from 'redux-saga/effects';
import { actionTypes, importAction } from './actions';
import { read, WorkBook, utils } from 'xlsx';

function processData(data: any[]) {
  // TODO: process data
}

function* importFileSaga(action: importAction) {
  const { fileRef } = action.payload;
  if (!fileRef) {
    return;
  }
  const fileReader = new FileReader();
  fileReader.readAsBinaryString(fileRef);

  fileReader.onload = (e) => {
    const data = e.target?.result;
    const workbook: WorkBook = read(data, { type: 'binary' });
    const fileData: any[] = [];
    workbook.SheetNames.forEach((name) => {
      const rowData = utils.sheet_to_json(workbook.Sheets[name]);
      fileData.push(rowData);
    });
    const normalizedData = processData(fileData);
    // TODO save data
  };
}

export default function* importWatcher() {
  yield takeEvery(actionTypes.IMPORT_FILE, importFileSaga);
}
