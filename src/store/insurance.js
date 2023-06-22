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

export { insurance, insuranceTotalPage } ;