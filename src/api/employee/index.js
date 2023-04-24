import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const employee = {
  get: (payloads, options) => {
    const url = api.employee.all + options
    return baseApi.get(url, payloads, { headers: getOriginHeader() })
  },
  add: (payloads) => {
    const url = api.employee.all
    return baseApi.post(url, payloads, { headers: getOriginHeader() })
  },
  update: (payloads, id) => {
    const url = api.employee.all + `/update/${id}`
    return baseApi.put(url, payloads, { headers: getOriginHeader() })
  },
  uploadPhoto: (payloads) => {
    const url = api.employee.uploadPhoto
    return baseApi.put(url, payloads, { headers: getOriginHeader() })
  },
  updatePassword: (payloads) => {
    const url = api.employee.updatePassword
    return baseApi.put(url, payloads, { headers: getOriginHeader() })
  },
}
export default employee
