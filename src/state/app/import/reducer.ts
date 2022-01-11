import * as Actions from './actions';
import get from 'lodash/get';

export enum Status {
  LOADING,
  LOADED,
  INITIAL,
  ERROR
}

export type State = Readonly<{
  data: object;
  fileRef: File | null;
  status: Status;
}>;

const initialState: State = {
  data: {},
  fileRef: null,
  status: Status.INITIAL
};


const importReducer = (state = initialState, action: Actions.allActions) => {
  switch (action.type) {
    case Actions.actionTypes.SET_STATUS:
      const status = get(action, 'payload.status');
      
      return {
        ...state,
        status
      }
  
    case Actions.actionTypes.SET_DATA:
      const data = get(action, 'payload.data', {});
      
      return {
        ...state,
        data,
        status: Status.LOADED
      }
  
    default:
      return state;
  }
}

export default importReducer;
