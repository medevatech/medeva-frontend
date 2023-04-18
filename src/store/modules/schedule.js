const schedule = (state = [], action) => {
    switch (action.type) {
        case "READ_SCHEDULE":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

export default schedule;