import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const price = {
  get: (payloads, options) => {
    const url = api.treatment.price + options
    return baseApi.get(url, payloads, { headers: getOriginHeader() })
  },
  add: (payloads) => {
    const url = api.treatment.price
    return baseApi.post(url, payloads, { headers: getOriginHeader() })
  },
  update: (payloads, id) => {
    const url = api.treatment.price + `/${id}`
    return baseApi.put(url, payloads, { headers: getOriginHeader() })
  },
  getByClinic: (payloads, id) => {
    const url = api.treatment.clinicPrice + `/${id}`
    return baseApi.get(url, payloads, { headers: getOriginHeader() })
  },
  update: (payloads, id) => {
    const url = api.treatment.price + `/${id}`
    return baseApi.put(url, payloads, { headers: getOriginHeader() })
  },
  archive: (payloads, id) => {
    const url = api.treatment.archivePrice + `/${id}`
    return baseApi.put(url, payloads, { headers: getOriginHeader() })
  },
  activate: (payloads, id) => {
    const url = api.treatment.activatePrice + `/${id}`
    return baseApi.put(url, payloads, { headers: getOriginHeader() })
  },
  delete: (payloads, id) => {
    const url = api.treatment.price + `/${id}`
    return baseApi.delete(url, payloads, { headers: getOriginHeader() })
  },
}
export default price