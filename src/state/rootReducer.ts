import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { namespace, reducer } from './app/import';
import { BrowserHistory } from 'history';

const createRootReducer = (history: BrowserHistory) =>
  combineReducers({
    router: connectRouter(history),
    [namespace]: reducer,
  });
export default createRootReducer;
