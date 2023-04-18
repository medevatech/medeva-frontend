import { combineReducers } from 'redux';
import menu from './menu/reducer';

import dashboard from "../store/modules/dashboard";
import employee from "../store/modules/employee";
import patient from "../store/modules/patient";
import record from "../store/modules/record";
import schedule from "../store/modules/schedule";
import vitalSigns from "../store/modules/vital-signs";

const reducers = combineReducers({
  menu,
  dashboard,
  employee,
  patient,
  record,
  schedule,
  vitalSigns
});

export default reducers;
