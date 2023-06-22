const partnership = (state = [], action) => {
    switch (action.type) {
        case "GET_PARTNERSHIP":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const partnershipTotalPage = (state = 0, action) => {
    switch (action.type) {
        case "GET_TOTAL_PAGE_PARTNERSHIP":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

export { partnership, partnershipTotalPage } ;