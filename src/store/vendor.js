const vendor = (state = [], action) => {
    switch (action.type) {
        case "GET_VENDOR":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const vendorTotalPage = (state = 0, action) => {
    switch (action.type) {
        case "GET_TOTAL_PAGE_VENDOR":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

export { vendor, vendorTotalPage } ;