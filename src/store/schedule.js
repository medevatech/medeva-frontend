const schedule = (state = [], action) => {
    switch (action.type) {
        case "GET_SCHEDULE":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const scheduleTotalPage = (state = 0, action) => {
    switch (action.type) {
        case "GET_TOTAL_PAGE_SCHEDULE":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

export { schedule, scheduleTotalPage } ;