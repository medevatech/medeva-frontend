import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const clinic = {
  get: (options) => {
    const url = api.medService.all + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  getByClinic: (options) => {
    const url = api.medService.clinic + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  add: (payloads) => {
    const url = api.medService.all
    return baseApi.post(url, payloads, { headers: getAuthHeader() })
  },
  update: (payloads, id) => {
    const url = api.medService.all + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  archive: (payloads, id) => {
    const url = api.medService.archive + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  activate: (payloads, id) => {
    const url = api.medService.activate + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  delete: (id) => {
    const url = api.medService.all + `/${id}`
    return baseApi.delete(url, { headers: getAuthHeader() })
  },
}
export default clinic