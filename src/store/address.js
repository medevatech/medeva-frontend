const province = (state = [], action) => {
    switch (action.type) {
        case "GET_PROVINCE":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const city = (state = [], action) => {
    switch (action.type) {
        case "GET_CITY":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const subdistrict = (state = [], action) => {
    switch (action.type) {
        case "GET_SUBDISTRICT":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

const ward = (state = [], action) => {
    switch (action.type) {
        case "GET_WARD":
            return action.payload;
            break;
        default:
            return state;
            break;
    }
}

export { province, city, subdistrict, ward } ;