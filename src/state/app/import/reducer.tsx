import * as Actions from './actions';
export type State = Readonly<{
  data: object;
  fileRef: File | null;
}>;

const initialState: State = {
  data: {},
  fileRef: null,
};

function createReducer(
  initialState: State,
  handlers: {
    [key: string]: (state: State, action: Actions.allActions) => State;
  }
) {
  return function reducer(state = initialState, action: Actions.allActions) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}

const importReducer = createReducer(initialState, {
  [Actions.actionTypes.IMPORT_FILE]: (state, action) => {
    const { fileRef }: Actions.importActionPayload = action.payload;

    return state;
  },
});

export default importReducer;
