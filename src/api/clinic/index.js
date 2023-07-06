import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const clinic = {
  get: (options) => {
    const url = api.clinic.all + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  getLogin: (options) => {
    const url = api.clinic.all + options
    return baseApi.get(url, { headers: getOriginHeader() })
  },
  add: (payloads) => {
    const url = api.clinic.all
    return baseApi.post(url, payloads, { headers: getAuthHeader() })
  },
  update: (payloads) => {
    const url = api.clinic.all+ `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  archive: (payloads, id) => {
    const url = api.clinic.archive + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  activate: (payloads, id) => {
    const url = api.clinic.activate + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  delete: (id) => {
    const url = api.clinic.all + `/${id}`
    return baseApi.delete(url, { headers: getAuthHeader() })
  },
}
export default clinic
