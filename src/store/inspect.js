

const inspect = (state = [], action) => {
    switch (action.type) {
        case "GET_INSPECT":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const inspectTotalPage = (state = 0, action) => {
    switch (action.type) {
        case "GET_TOTAL_PAGE_INSPECT":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

export { inspect, inspectTotalPage } ;