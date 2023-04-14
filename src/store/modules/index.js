import { combineReducers } from "redux";

import patient from "./patient";

const modules = combineReducers({
    patient: patient,
})

export default modules;