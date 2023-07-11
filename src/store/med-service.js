const medService = (state = [], action) => {
    switch (action.type) {
        case "GET_MED_SERVICE":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const medServiceTotalPage = (state = 0, action) => {
    switch (action.type) {
        case "GET_TOTAL_PAGE_MED_SERVICE":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const medServiceClinic = (state = [], action) => {
    switch (action.type) {
        case "GET_MED_SERVICE_CLINIC":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const medServiceClinicTotalPage = (state = 0, action) => {
    switch (action.type) {
        case "GET_TOTAL_PAGE_MED_SERVICE_CLINIC":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

export { medService, medServiceTotalPage, medServiceClinic, medServiceClinicTotalPage } ;