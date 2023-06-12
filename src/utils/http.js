const getAuthHeader = () => {
  return {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user_data')).token}`,
    'Access-Control-Allow-Origin': '*',
  }
}

const getOriginHeader = () => {
  return {
    'Access-Control-Allow-Origin': '*'
  }
}

const getJSONHeader = () => {
  return {
    'Content-Type': 'application/json'
  }
}

const getAuthAndMultipartHeader = () => {
  return {
    'Content-Type': 'multipart/form-data',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
    'Access-Control-Allow-Origin': '*'
  }
}

export { getAuthHeader, getOriginHeader, getAuthAndMultipartHeader, getJSONHeader }
