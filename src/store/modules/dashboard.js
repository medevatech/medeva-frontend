const dashboard = (state = [], action) => {
    switch (action.type) {
        case "READ_DASHBOARD":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

export default dashboard;