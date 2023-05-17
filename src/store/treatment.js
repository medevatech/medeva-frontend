const treatment = (state = [], action) => {
    switch (action.type) {
        case "GET_TREATMENT":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const treatmentTotalPage = (state = 0, action) => {
    switch (action.type) {
        case "GET_TOTAL_PAGE_TREATMENT":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const treatmentList = (state = [], action) => {
    switch (action.type) {
        case "GET_TREATMENT_LIST":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const treatmentListTotalPage = (state = 0, action) => {
    switch (action.type) {
        case "GET_TOTAL_PAGE_TREATMENT_LIST":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const treatmentPrice = (state = [], action) => {
    switch (action.type) {
        case "GET_TREATMENT_PRICE":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const treatmentPriceTotalPage = (state = 0, action) => {
    switch (action.type) {
        case "GET_TOTAL_PAGE_TREATMENT_PRICE":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

export { treatment, treatmentTotalPage, treatmentList, treatmentListTotalPage, treatmentPrice, treatmentPriceTotalPage } ;