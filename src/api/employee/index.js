import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const employee = {
  get: (options) => {
    const url = api.employee.all + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  add: (payloads) => {
    const url = api.employee.all
    return baseApi.post(url, payloads, { headers: getAuthHeader() })
  },
  update: (payloads, id) => {
    const url = api.employee.all + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  uploadPhoto: (payloads) => {
    const url = api.employee.uploadPhoto
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  updatePassword: (payloads, id) => {
    const url = api.employee.updatePassword + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  archive: (payloads, id) => {
    const url = api.employee.archive + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  activate: (payloads, id) => {
    const url = api.employee.activate + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  delete: (id) => {
    const url = api.employee.all + `/${id}`
    return baseApi.delete(url, { headers: getAuthHeader() })
  },
}
export default employee
