import * as Actions from "./actions";
export type State = Readonly<{
  data: object;
  fileRef: File | null;
}>;

const intialState: State = {
  data: {},
  fileRef: null,
};

const importReducer = (state = intialState, action: Actions.Action) => {
  switch (action.payload) {
    default:
      return state;
  }
};

export default importReducer;
