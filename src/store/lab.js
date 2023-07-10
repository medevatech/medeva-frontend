const lab = (state = [], action) => {
    switch (action.type) {
        case "GET_LAB":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const labTotalPage = (state = 0, action) => {
    switch (action.type) {
        case "GET_TOTAL_PAGE_LAB":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const labServices = (state = [], action) => {
    switch (action.type) {
        case "GET_LAB_SERVICES":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const labServicesTotalPage = (state = 0, action) => {
    switch (action.type) {
        case "GET_TOTAL_PAGE_LAB_SERVICES":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

export { lab, labTotalPage, labServices, labServicesTotalPage } ;