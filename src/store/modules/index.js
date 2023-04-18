import { combineReducers } from "redux";

import dashboard from "./dashboard";
import employee from "./employee";
import patient from "./patient";
import record from "./record";
import schedule from "./schedule";
import vitalSigns from "./vital-signs";

const modules = combineReducers({
    dashboard: dashboard,
    employee: employee,
    patient: patient,
    record: record,
    schedule: schedule,
    vitalSigns: vitalSigns
})

export default modules;