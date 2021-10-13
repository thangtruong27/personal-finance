import { ReduxData } from '../../../helpers/processData';

export const namespace = 'import';
export const actionTypes = {
  IMPORT_FILE: `${namespace}/IMPORT_FILE`,
  SET_DATA: `${namespace}/SET_DATA`,
};
export type importActionPayload = { fileRef: File | null };

export const importFile = ({ fileRef }: importActionPayload) => ({
  type: actionTypes.IMPORT_FILE,
  payload: {
    fileRef,
  },
});

export const setData = (data: ReduxData) => ({
  type: actionTypes.SET_DATA,
  payload: {
    data
  },
});
export type importAction = ReturnType<typeof importFile>;
export type setDataAction = ReturnType<typeof setData>;
export type allActions = importAction | setDataAction;
