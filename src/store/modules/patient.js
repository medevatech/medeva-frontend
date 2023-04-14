const patient = (state = [], action) => {
    switch (action.type) {
        case "READ_PATIENT":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

export default patient;