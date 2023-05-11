const disease = (state = [], action) => {
    switch (action.type) {
        case "GET_DISEASE":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const diseaseTotalPage = (state = 0, action) => {
    switch (action.type) {
        case "GET_TOTAL_PAGE_DISEASE":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

export { disease, diseaseTotalPage } ;