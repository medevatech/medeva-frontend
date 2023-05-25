const vitalSigns = (state = [], action) => {
    switch (action.type) {
        case "READ_VITALSIGNS":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const vitalSignsTotalPage = (state = 0, action) => {
    switch (action.type) {
        case "GET_TOTAL_PAGE_VITALSIGNS":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const allVitalSignsByPatient = (state = [], action) => {
    switch (action.type) {
        case "GET_ALL_VITALSIGNS_BY_PATIENT":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

export { vitalSigns, vitalSignsTotalPage, allVitalSignsByPatient } ;