const service = (state = [], action) => {
    switch (action.type) {
        case "GET_SERVICE":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const serviceTotalPage = (state = 0, action) => {
    switch (action.type) {
        case "GET_TOTAL_PAGE_SERVICE":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const serviceList = (state = [], action) => {
    switch (action.type) {
        case "GET_SERVICE_LIST":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const serviceListTotalPage = (state = 0, action) => {
    switch (action.type) {
        case "GET_TOTAL_PAGE_SERVICE_LIST":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const servicePrice = (state = [], action) => {
    switch (action.type) {
        case "GET_SERVICE_PRICE":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const servicePriceTotalPage = (state = 0, action) => {
    switch (action.type) {
        case "GET_TOTAL_PAGE_SERVICE_PRICE":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

export { service, serviceTotalPage, serviceList, serviceListTotalPage, servicePrice, servicePriceTotalPage } ;