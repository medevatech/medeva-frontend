const medicine = (state = [], action) => {
    switch (action.type) {
        case "GET_MEDICINE":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const medicineTotalPage = (state = 0, action) => {
    switch (action.type) {
        case "GET_TOTAL_PAGE_MEDICINE":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

export { medicine, medicineTotalPage } ;