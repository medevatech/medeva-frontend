const API = (url, optional) => {
    return fetch(`${process.env.REACT_APP_BASE_PATHV1}/${url}`, optional)
}

export default API;
