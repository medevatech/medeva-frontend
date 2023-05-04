const division = (state = [], action) => {
    switch (action.type) {
        case "GET_DIVISION":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const divisionTotalPage = (state = 0, action) => {
    switch (action.type) {
        case "GET_TOTAL_PAGE_DIVISION":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

export { division, divisionTotalPage } ;