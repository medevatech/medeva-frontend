const treatmentList = (state = [], action) => {
    switch (action.type) {
        case "GET_TREATMENT":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const treatmentListTotalPage = (state = 0, action) => {
    switch (action.type) {
        case "GET_TOTAL_PAGE_TREATMENT":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

export { treatmentList, treatmentListTotalPage } ;