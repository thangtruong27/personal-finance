export const namespace = 'import';
export const actionTypes = {
  IMPORT_FILE: `${namespace}/IMPORT_FILE`,
};
export type importActionPayload = { fileRef: File | null };
export type importActionPayloadA = { fileRef: string } & importActionPayload;

export const importFile = ({ fileRef }: importActionPayload) => ({
  type: actionTypes.IMPORT_FILE,
  payload: {
    fileRef,
  },
});
export type importAction = ReturnType<typeof importFile>;

export type allActions = importAction;
