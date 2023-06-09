import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const patient = {
  get: (options) => {
    const url = api.patient.all + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  getClinicalRules: (options) => {
    const url = api.patient.clinicalRules + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  add: (payloads) => {
    const url = api.patient.all
    return baseApi.post(url, payloads, { headers: getAuthHeader() })
  },
  updateClinicalRules: (payloads, id) => {
    const url = api.patient.clinicalRules + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  update: (payloads, id) => {
    const url = api.patient.all + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  archive: (payloads, id) => {
    const url = api.patient.archive + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  activate: (payloads, id) => {
    const url = api.patient.activate + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  delete: (id) => {
    const url = api.patient.all + `/${id}`
    return baseApi.delete(url, { headers: getAuthHeader() })
  },
}
export default patient
