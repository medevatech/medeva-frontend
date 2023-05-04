import { combineReducers } from 'redux';
import menu from './menu/reducer';

import dashboard from "store/dashboard";
import { patient, patientTotalPage } from "store/patient";
import { vitalSigns, vitalSignsTotalPage } from "store/vital-signs";
import { record, recordTotalPage, allRecordByPatient } from "store/record";
import schedule from "store/schedule";
import { employee, employeeTotalPage } from "store/employee";
import { division, divisionTotalPage } from "store/division";
import { queue, queueTotalPage } from "store/queue";

import { province, city, subdistrict, ward } from 'store/address';

const reducers = combineReducers({
  menu,
  dashboard,
  patient,
  patientTotalPage,
  allRecordByPatient,
  queue,
  queueTotalPage,
  vitalSigns,
  vitalSignsTotalPage,
  record,
  recordTotalPage,
  schedule,
  employee,
  employeeTotalPage,
  division,
  divisionTotalPage,

  province,
  city, 
  subdistrict, 
  ward
});

export default reducers;
