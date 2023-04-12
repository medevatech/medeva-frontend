import { combineReducers } from 'redux';
import menu from './menu/reducer';
import authUser from './auth/reducer';

const reducers = combineReducers({
  menu,
  authUser,
});

export default reducers;
