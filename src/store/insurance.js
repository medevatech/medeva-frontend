const insurance = (state = [], action) => {
    switch (action.type) {
        case "GET_INSURANCE":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const insuranceTotalPage = (state = 0, action) => {
    switch (action.type) {
        case "GET_TOTAL_PAGE_INSURANCE":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const insuranceMetrics = (state = [], action) => {
    switch (action.type) {
        case "GET_METRICS_INSURANCE_DASHBOARD":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const insuranceDashboard = (state = [], action) => {
    switch (action.type) {
        case "GET_INSURANCE_DASHBOARD":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const insuranceDashboardTotalPage = (state = 0, action) => {
    switch (action.type) {
        case "GET_TOTAL_PAGE_INSURANCE_DASHBOARD":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

export { insurance, insuranceTotalPage, insuranceMetrics, insuranceDashboard, insuranceDashboardTotalPage } ;