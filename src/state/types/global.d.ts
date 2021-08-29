import { store } from '../../App';
export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;

declare global{
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;  
  }
}
