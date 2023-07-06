const consumables = (state = [], action) => {
    switch (action.type) {
        case "GET_CONSUMABLES":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const consumablesTotalPage = (state = 0, action) => {
    switch (action.type) {
        case "GET_TOTAL_PAGE_CONSUMABLES":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const consumablesClinic = (state = [], action) => {
    switch (action.type) {
        case "GET_CONSUMABLES_CLINIC":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const consumablesClinicTotalPage = (state = 0, action) => {
    switch (action.type) {
        case "GET_TOTAL_PAGE_CONSUMABLES_CLINIC":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const consumablesService = (state = [], action) => {
    switch (action.type) {
        case "GET_CONSUMABLES_SERVICE":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const consumablesServiceTotalPage = (state = 0, action) => {
    switch (action.type) {
        case "GET_TOTAL_PAGE_CONSUMABLES_SERVICE":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

export { consumables, consumablesTotalPage, consumablesClinic, consumablesClinicTotalPage, consumablesService, consumablesServiceTotalPage } ;