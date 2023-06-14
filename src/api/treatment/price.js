import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const price = {
  get: (options) => {
    const url = api.treatment.price + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  getByClinic: (id) => {
    const url = api.treatment.clinicPrice + `/${id}`
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  add: (payloads) => {
    const url = api.treatment.price
    return baseApi.post(url, payloads, { headers: getAuthHeader() })
  },
  update: (payloads, id) => {
    const url = api.treatment.price + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  update: (payloads, id) => {
    const url = api.treatment.price + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  archive: (payloads, id) => {
    const url = api.treatment.archivePrice + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  activate: (payloads, id) => {
    const url = api.treatment.activatePrice + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  delete: (id) => {
    const url = api.treatment.price + `/${id}`
    return baseApi.delete(url, { headers: getAuthHeader() })
  },
}
export default price