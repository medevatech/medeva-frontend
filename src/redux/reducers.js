import { combineReducers } from 'redux';
import menu from './menu/reducer';

import dashboard from "store/dashboard";
import { patient, patientTotalPage } from "store/patient";
import { vitalSigns, vitalSignsTotalPage, allVitalSignsByPatient } from "store/vital-signs";
import { record, recordTotalPage, allRecordByPatient } from "store/record";
import { schedule, scheduleTotalPage } from "store/schedule";
import { shift, shiftTotalPage } from "store/shift";
import { employee, employeeTotalPage } from "store/employee";
import { division, divisionTotalPage } from "store/division";
import { queue, queueTotalPage } from "store/queue";
import { disease, diseaseTotalPage } from 'store/disease';
import { medicine, medicineTotalPage } from 'store/medicine';
import { lab, labTotalPage } from 'store/lab';
import { inspect, inspectTotalPage } from 'store/inspect';
import { treatment, treatmentTotalPage, treatmentList, treatmentListTotalPage, treatmentPrice, treatmentPriceTotalPage } from 'store/treatment';
import { service, serviceTotalPage, serviceList, serviceListTotalPage, servicePrice, servicePriceTotalPage } from 'store/service';
import { diagnoseReference, diagnoseReferenceTotalPage, divisionReference, divisionReferenceTotalPage, hospitalReference, hospitalReferenceTotalPage } from 'store/reference';
import { action, actionTotalPage } from 'store/action';

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
  allVitalSignsByPatient,
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
  inspect,
  inspectTotalPage,
  treatment,
  treatmentTotalPage,
  treatmentList,
  treatmentListTotalPage,
  treatmentPrice,
  treatmentPriceTotalPage,
  diagnoseReference,
  diagnoseReferenceTotalPage,
  divisionReference,
  divisionReferenceTotalPage,
  hospitalReference,
  hospitalReferenceTotalPage,
  action,
  actionTotalPage,
  service,
  serviceTotalPage,
  serviceList,
  serviceListTotalPage,
  servicePrice,
  servicePriceTotalPage,

  province,
  city, 
  subdistrict, 
  ward
});

export default reducers;
