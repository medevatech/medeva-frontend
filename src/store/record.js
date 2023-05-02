const record = (state = [], action) => {
    switch (action.type) {
        case "GET_RECORD":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const recordTotalPage = (state = 0, action) => {
    switch (action.type) {
        case "GET_TOTAL_PAGE_RECORD":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const allRecordByPatient = (state = [], action) => {
    switch (action.type) {
        case "GET_ALL_RECORD_BY_PATIENT":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

export { record, recordTotalPage, allRecordByPatient } ;