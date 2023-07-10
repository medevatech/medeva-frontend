import { combineReducers } from 'redux';
import menu from './menu/reducer';

import dashboard from "store/dashboard";
import { patient, patientTotalPage } from "store/patient";
import { insurance, insuranceTotalPage, insuranceMetrics, insuranceDashboard, insuranceDashboardTotalPage } from "store/insurance";
import { partnership, partnershipTotalPage } from "store/partnership";
import { vitalSigns, vitalSignsTotalPage, allVitalSignsByPatient } from "store/vital-signs";
import { record, recordTotalPage, allRecordByPatient } from "store/record";
import { schedule, scheduleTotalPage } from "store/schedule";
import { shift, shiftTotalPage } from "store/shift";
import { employee, employeeTotalPage } from "store/employee";
import { division, divisionTotalPage } from "store/division";
import { queue, queueTotalPage } from "store/queue";
import { disease, diseaseTotalPage } from 'store/disease';
import { medicine, medicineTotalPage, medicineList, medicineListTotalPage, medicineClinic, medicineClinicTotalPage } from 'store/medicine';
import { consumables, consumablesTotalPage, consumablesClinic, consumablesClinicTotalPage, consumablesService, consumablesServiceTotalPage } from 'store/consumables';
import { lab, labTotalPage, labServices, labServicesTotalPage } from 'store/lab';
import { inspect, inspectTotalPage, inspectList, inspectListTotalPage } from 'store/inspect';
import { treatment, treatmentTotalPage, treatmentList, treatmentListTotalPage, treatmentPrice, treatmentPriceTotalPage } from 'store/treatment';
import { service, serviceTotalPage, serviceList, serviceListTotalPage, servicePrice, servicePriceTotalPage } from 'store/service';
import { diagnoseReference, diagnoseReferenceTotalPage, divisionReference, divisionReferenceTotalPage, hospitalReference, hospitalReferenceTotalPage } from 'store/reference';
import { action, actionTotalPage } from 'store/action';
import { vendor, vendorTotalPage } from 'store/vendor';

import { province, city, subdistrict, ward } from 'store/address';

const reducers = combineReducers({
  menu,
  dashboard,
  patient, patientTotalPage, allRecordByPatient,
  insurance, insuranceTotalPage, insuranceMetrics, insuranceDashboard, insuranceDashboardTotalPage,
  partnership, partnershipTotalPage,
  queue, queueTotalPage,
  vitalSigns, vitalSignsTotalPage, allVitalSignsByPatient,
  record, recordTotalPage, schedule, scheduleTotalPage,
  shift, shiftTotalPage,
  employee, employeeTotalPage,
  division, divisionTotalPage,
  disease, diseaseTotalPage,
  medicine, medicineTotalPage, medicineList, medicineListTotalPage, medicineClinic, medicineClinicTotalPage,
  consumables, consumablesTotalPage, consumablesClinic, consumablesClinicTotalPage, consumablesService, consumablesServiceTotalPage,
  lab, labTotalPage, labServices, labServicesTotalPage,
  inspect, inspectTotalPage, inspectList, inspectListTotalPage,
  treatment, treatmentTotalPage, treatmentList, treatmentListTotalPage, treatmentPrice, treatmentPriceTotalPage,
  diagnoseReference, diagnoseReferenceTotalPage,
  divisionReference, divisionReferenceTotalPage,
  hospitalReference, hospitalReferenceTotalPage,
  service,  serviceTotalPage,
  serviceList, serviceListTotalPage, servicePrice, servicePriceTotalPage,
  action, actionTotalPage,
  vendor, vendorTotalPage,

  province,
  city, 
  subdistrict, 
  ward
});

export default reducers;
