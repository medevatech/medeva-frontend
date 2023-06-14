import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const price = {
  get: (options) => {
    const url = api.service.price + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  getByClinic: (id) => {
    const url = api.service.clinicPrice + `/${id}`
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  add: (payloads) => {
    const url = api.service.price
    return baseApi.post(url, payloads, { headers: getAuthHeader() })
  },
  update: (payloads, id) => {
    const url = api.service.price + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  update: (payloads, id) => {
    const url = api.service.price + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  archive: (payloads, id) => {
    const url = api.service.archivePrice + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  activate: (payloads, id) => {
    const url = api.service.activatePrice + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  delete: (id) => {
    const url = api.service.price + `/${id}`
    return baseApi.delete(url, { headers: getAuthHeader() })
  },
}
export default price