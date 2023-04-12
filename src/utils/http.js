const getAuthHeader = () => {
  return {
    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    'Access-Control-Allow-Origin': '*'
  }
}

const getOriginHeader = () => {
  return {
    'Access-Control-Allow-Origin': '*'
  }
}

const getAuthAndMultipartHeader = () => {
  return {
    'Content-Type': 'multipart/form-data',
    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    'Access-Control-Allow-Origin': '*'
  }
}

export { getAuthHeader, getOriginHeader, getAuthAndMultipartHeader }
