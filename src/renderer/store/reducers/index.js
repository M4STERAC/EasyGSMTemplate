// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import server from './server';
import settings from './settings';
import notification from './notification';

// ==============================|| COMBINE REDUCERS ||============================== //

const appReducer = combineReducers({ menu, server, settings, notification });
const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') state = undefined;
  return appReducer(state, action);
};

export default rootReducer;
