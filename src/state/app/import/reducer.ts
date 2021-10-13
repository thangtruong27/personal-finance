import * as Actions from './actions';
import get from 'lodash/get';

export type State = Readonly<{
  data: object;
  fileRef: File | null;
}>;

const initialState: State = {
  data: {},
  fileRef: null,
};


const importReducer= (state = initialState, action: Actions.allActions) => {
  switch (action.type) {
    case Actions.actionTypes.SET_DATA:
      const data = get(action, 'payload.data', {});
      
      return {
        ...state,
        data
      }
  
    default:
      return state;
  }
}

export default importReducer;
