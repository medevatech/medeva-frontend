const property = (state = [], action) => {
    switch (action.type) {
        case "GET_PROPERTY":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const propertyTotalPage = (state = 0, action) => {
    switch (action.type) {
        case "GET_TOTAL_PAGE_PROPERTY":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const propertyClinic = (state = [], action) => {
    switch (action.type) {
        case "GET_PROPERTY_CLINIC":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const propertyClinicTotalPage = (state = 0, action) => {
    switch (action.type) {
        case "GET_TOTAL_PAGE_PROPERTY_CLINIC":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

export { property, propertyTotalPage, propertyClinic, propertyClinicTotalPage } ;