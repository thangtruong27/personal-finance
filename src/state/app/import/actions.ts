import { ReduxData } from '../../../helpers/processData';
import { Status } from './reducer';

export const namespace = 'import';
export const actionTypes = {
  IMPORT_FILE: `${namespace}/IMPORT_FILE`,
  SET_DATA: `${namespace}/SET_DATA`,
  SET_STATUS: `${namespace}/SET_STATUS`,
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

export const setStatus = (status: Status) => ({
  type: actionTypes.SET_STATUS,
  payload: {
    status
  },
});

export type importAction = ReturnType<typeof importFile>;
export type setDataAction = ReturnType<typeof setData>;
export type setStatusAction = ReturnType<typeof setStatus>;

export type allActions = importAction | setDataAction ;
