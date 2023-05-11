import axios from 'axios'
// import store from 'store'

const baseApi = axios.create({
  baseURL: process.env.REACT_APP_BASE_PATHV1,
  headers: {
    // common: {
      // 'x-g2-timeZone-offset': new Date().getTimezoneOffset()
    // }
  }
})

const responseHandler = (response) => {
  if (response.status === 401) {
    // store.dispatch('auth/showUnauthorizedModal')
  }
  return response
}
const errorHandler = (error) => {
  if (error.status === 401) {
    // store.dispatch('auth/showUnauthorizedModal')
  }
  return Promise.reject(error)
}
baseApi.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
)

export default baseApi
