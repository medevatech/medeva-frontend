import { combineReducers } from 'redux';
import menu from './menu/reducer';

import dashboard from "store/dashboard";
import { patient, patientTotalPage } from "store/patient";
import { vitalSigns, vitalSignsTotalPage } from "store/vital-signs";
import { record, recordTotalPage, allRecordByPatient } from "store/record";
import { schedule, scheduleTotalPage } from "store/schedule";
import { shift, shiftTotalPage } from "store/shift";
import { employee, employeeTotalPage } from "store/employee";
import { division, divisionTotalPage } from "store/division";
import { queue, queueTotalPage } from "store/queue";
import { disease, diseaseTotalPage } from 'store/disease';
import { medicine, medicineTotalPage } from 'store/medicine';
import { lab, labTotalPage } from 'store/lab';
import { inspectList, inspectListTotalPage } from 'store/inspect-list';
import { treatmentList, treatmentListTotalPage } from 'store/treatment-list';
import { divisionReference, divisionReferenceTotalPage } from 'store/division-reference';
import { hospitalReference, hospitalReferenceTotalPage } from 'store/hospital-reference';


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
  scheduleTotalPage,
  shift,
  shiftTotalPage,
  employee,
  employeeTotalPage,
  division,
  divisionTotalPage,
  disease,
  diseaseTotalPage,
  medicine,
  medicineTotalPage,
  lab,
  labTotalPage,
  inspectList,
  inspectListTotalPage,
  treatmentList,
  treatmentListTotalPage,
  divisionReference,
  divisionReferenceTotalPage,
  hospitalReference,
  hospitalReferenceTotalPage,

  province,
  city, 
  subdistrict, 
  ward
});

export default reducers;
