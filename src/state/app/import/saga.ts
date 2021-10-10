import { takeEvery } from 'redux-saga/effects';
import { actionTypes, importAction } from './actions';
import { read, WorkBook, utils } from 'xlsx';
import processData from '../../../helpers/processData';

function* importFileSaga(action: importAction) {
  const { fileRef } = action.payload;
  if (!fileRef) {
    return;
  }
  const fileReader = new FileReader();
  fileReader.readAsBinaryString(fileRef);

  fileReader.onload = (e) => {
    const data = e.target?.result;
    const workbook: WorkBook = read(data, {
      type: 'binary',
      cellDates: true,
    });
    let fileData: unknown[] = [];
    workbook.SheetNames.forEach((name) => {
      const rowData = utils.sheet_to_json(workbook.Sheets[name], {
        raw: true,
      });
      fileData = [...fileData, ...rowData];
    });
    const normalizedData = processData(fileData);    
    // TODO save data
  };
}

export default function* importWatcher() {
  yield takeEvery(actionTypes.IMPORT_FILE, importFileSaga);
}
