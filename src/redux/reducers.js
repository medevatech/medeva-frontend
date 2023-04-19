import { combineReducers } from 'redux';
import menu from './menu/reducer';

import dashboard from "../store/dashboard";
import employee from "../store/employee";
import employeeTotalPage from "../store/employeeTotalPage";
import patient from "../store/patient";
import patientTotalPage from "../store/patientTotalPage";
import record from "../store/record";
import schedule from "../store/schedule";
import vitalSigns from "../store/vital-signs";

const reducers = combineReducers({
  menu,
  dashboard,
  employee,
  employeeTotalPage,
  patient,
  patientTotalPage,
  record,
  schedule,
  vitalSigns
});

export default reducers;
