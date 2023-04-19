const employee = (state = [], action) => {
    switch (action.type) {
        case "GET_EMPLOYEE":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const employeeTotalPage = (state = 0, action) => {
    switch (action.type) {
        case "GET_TOTAL_PAGE_EMPLOYEE":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

export { employee, employeeTotalPage } ;