const hospitalReference = (state = [], action) => {
    switch (action.type) {
        case "GET_HOSPITALREFERENCE":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const hospitalReferenceTotalPage = (state = 0, action) => {
    switch (action.type) {
        case "GET_TOTAL_PAGE_HOSPITALREFERENCE":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

export { hospitalReference, hospitalReferenceTotalPage } ;