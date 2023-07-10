
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

const inspectList = (state = [], action) => {
    switch (action.type) {
        case "GET_INSPECT_LIST":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const inspectListTotalPage = (state = 0, action) => {
    switch (action.type) {
        case "GET_TOTAL_PAGE_INSPECT_LIST":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

export { inspect, inspectTotalPage, inspectList, inspectListTotalPage } ;