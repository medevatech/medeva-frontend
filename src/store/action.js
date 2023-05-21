const action = (state = [], action) => {
    switch (action.type) {
        case "GET_ACTION":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const actionTotalPage = (state = 0, action) => {
    switch (action.type) {
        case "GET_TOTAL_PAGE_ACTION":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

export { action, actionTotalPage } ;