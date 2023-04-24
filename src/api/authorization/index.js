import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const auth = {
//   resetPasswordCRM: (email) => {
//     const url = api.auth.resetPasswordCRM
//     return baseApi.put(`${url}?email=${email}`)
//   },
//   changePasswordCRM: (payloads) => {
//     const url = api.auth.changePasswordCRM
//     return baseApi.post(url, payloads, {
//       headers: getAuthHeader()
//     })
//   },
//   resetPasswordEvent: (payloads) => {
//     const url = api.auth.resetPasswordEvent
//     return baseApi.post(url, payloads)
//   }
  login: (payloads) => {
    const url = api.auth.login
    return baseApi.post(url, payloads, { headers: getOriginHeader() })
  },
  register: (payloads) => {
    const url = api.auth.register
    return baseApi.post(url, payloads, { headers: getOriginHeader() })
  }
}
export default auth
