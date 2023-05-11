const shift = (state = [], action) => {
    switch (action.type) {
        case "GET_SHIFT":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const shiftTotalPage = (state = 0, action) => {
    switch (action.type) {
        case "GET_TOTAL_PAGE_SHIFT":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

export { shift, shiftTotalPage } ;