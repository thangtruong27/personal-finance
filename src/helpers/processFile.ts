import { read, WorkBook, utils } from 'xlsx';

function getDataFromXlsx(fileRef: File) {
  return new Promise<unknown[]>((resolve, reject) => {
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
      resolve(fileData);
    };

    fileReader.onerror = (e) => {
      reject(e);
    };
  });
}

export { getDataFromXlsx };
