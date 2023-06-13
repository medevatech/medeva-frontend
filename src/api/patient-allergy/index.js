import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const patientAllergy = {
  get: (options) => {
    const url = api.patientAllergy.all + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  getByPatient: (options) => {
    const url = api.patientAllergy.patient + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  add: (payloads) => {
    const url = api.patientAllergy.all
    return baseApi.post(url, payloads, { headers: getAuthHeader() })
  },
  update: (payloads, id) => {
    const url = api.patientAllergy.all + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  delete: (payloads, id) => {
    const url = api.patientAllergy.all + `/${id}`
    return baseApi.delete(url, payloads, { headers: getAuthHeader() })
  },
}
export default patientAllergy
