const medicine = (state = [], action) => {
    switch (action.type) {
        case "GET_MEDICINE":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const medicineTotalPage = (state = 0, action) => {
    switch (action.type) {
        case "GET_TOTAL_PAGE_MEDICINE":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const medicineList = (state = [], action) => {
    switch (action.type) {
        case "GET_MEDICINE_LIST":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const medicineListTotalPage = (state = 0, action) => {
    switch (action.type) {
        case "GET_TOTAL_PAGE_MEDICINE_LIST":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const medicineClinic = (state = [], action) => {
    switch (action.type) {
        case "GET_MEDICINE_CLINIC":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const medicineClinicTotalPage = (state = 0, action) => {
    switch (action.type) {
        case "GET_TOTAL_PAGE_MEDICINE_CLINIC":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

export { medicine, medicineTotalPage, medicineList, medicineListTotalPage, medicineClinic, medicineClinicTotalPage } ;