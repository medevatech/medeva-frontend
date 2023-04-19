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

export default employee;