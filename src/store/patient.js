const patient = (state = [], action) => {
    switch (action.type) {
        case "READ_PATIENT":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const patientTotalPage = (state = 0, action) => {
    switch (action.type) {
        case "GET_TOTAL_PAGE_PATIENT":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

export { patient, patientTotalPage } ;