import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const clinic = {
  get: (options) => {
    const url = api.patient.clinic + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  getClinicByClinic: (options) => {
    const url = api.patient.clinicByClinic + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  getClinicByPatient: (options) => {
    const url = api.patient.clinicByPatient + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  add: (payloads) => {
    const url = api.patient.clinic
    return baseApi.post(url, payloads, { headers: getAuthHeader() })
  },
  update: (payloads, id) => {
    const url = api.patient.clinic + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  archive: (payloads, id) => {
    const url = api.patient.clinicArchive + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  activate: (payloads, id) => {
    const url = api.patient.clinicActivate + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  delete: (id) => {
    const url = api.patient.clinic + `/${id}`
    return baseApi.delete(url, { headers: getAuthHeader() })
  },
}
export default clinic
