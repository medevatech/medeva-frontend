const divisionReference = (state = [], action) => {
    switch (action.type) {
        case "GET_DIVISIONREFERENCE":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const divisionReferenceTotalPage = (state = 0, action) => {
    switch (action.type) {
        case "GET_TOTAL_PAGE_DIVISIONREFERENCE":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

export { divisionReference, divisionReferenceTotalPage } ;