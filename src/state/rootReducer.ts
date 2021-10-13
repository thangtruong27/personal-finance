import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { namespace, reducer } from './app/import';
import { History } from 'history';

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    [namespace]: reducer,
  });
export default createRootReducer;
