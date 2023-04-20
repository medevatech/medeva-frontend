const queue = (state = [], action) => {
    switch (action.type) {
        case "READ_QUEUE":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const queueTotalPage = (state = 0, action) => {
    switch (action.type) {
        case "GET_TOTAL_PAGE_QUEUE":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

export { queue, queueTotalPage } ;