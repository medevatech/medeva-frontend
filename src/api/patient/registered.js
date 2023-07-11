import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const registered = {
  get: (options) => {
    const url = api.patient.registered + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  getRegisteredByClinic: (options) => {
    const url = api.patient.registeredByClinic + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  getRegisteredByPatient: (options) => {
    const url = api.patient.registeredByPatient + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  add: (payloads) => {
    const url = api.patient.registered
    return baseApi.post(url, payloads, { headers: getAuthHeader() })
  },
  update: (payloads, id) => {
    const url = api.patient.registered + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  archive: (payloads, id) => {
    const url = api.patient.registeredArchive + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  activate: (payloads, id) => {
    const url = api.patient.registeredActivate + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  delete: (id) => {
    const url = api.patient.registered + `/${id}`
    return baseApi.delete(url, { headers: getAuthHeader() })
  },
}
export default registered
