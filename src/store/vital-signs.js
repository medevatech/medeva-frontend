const vitalSigns = (state = [], action) => {
    switch (action.type) {
        case "READ_VITALSIGNS":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

export default vitalSigns;