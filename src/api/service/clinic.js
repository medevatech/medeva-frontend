import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const clinic = {
  get: (options) => {
    const url = api.service.clinic + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  add: (payloads) => {
    const url = api.service.clinic
    return baseApi.post(url, payloads, { headers: getAuthHeader() })
  },
  update: (payloads, id) => {
    const url = api.service.clinic + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  update: (payloads, id) => {
    const url = api.service.clinic + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  archive: (payloads, id) => {
    const url = api.service.archiveClinic + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  activate: (payloads, id) => {
    const url = api.service.activateClinic + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  delete: (id) => {
    const url = api.service.clinic + `/${id}`
    return baseApi.delete(url, { headers: getAuthHeader() })
  },
}
export default clinic