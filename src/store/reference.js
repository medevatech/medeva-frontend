const diagnoseReference = (state = [], action) => {
    switch (action.type) {
        case "GET_DIVISION_REFERENCE":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const diagnoseReferenceTotalPage = (state = 0, action) => {
    switch (action.type) {
        case "GET_TOTAL_PAGE_DIVISION_REFERENCE":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const divisionReference = (state = [], action) => {
    switch (action.type) {
        case "GET_DIVISION_REFERENCE":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const divisionReferenceTotalPage = (state = 0, action) => {
    switch (action.type) {
        case "GET_TOTAL_PAGE_DIVISION_REFERENCE":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const hospitalReference = (state = [], action) => {
    switch (action.type) {
        case "GET_HOSPITAL_REFERENCE":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const hospitalReferenceTotalPage = (state = 0, action) => {
    switch (action.type) {
        case "GET_TOTAL_PAGE_HOSPITAL_REFERENCE":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

export { diagnoseReference, diagnoseReferenceTotalPage, divisionReference, divisionReferenceTotalPage, hospitalReference, hospitalReferenceTotalPage } ;