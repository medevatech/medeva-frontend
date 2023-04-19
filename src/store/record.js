const record = (state = [], action) => {
    switch (action.type) {
        case "READ_RECORD":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

export default record;