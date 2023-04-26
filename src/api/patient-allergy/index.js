import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const patientAllergy = {
  get: (payloads, options) => {
    const url = api.patientAllergy.all + options
    return baseApi.get(url, payloads, { headers: getOriginHeader() })
  },
  getByPatient: (payloads, options) => {
    const url = api.patientAllergy.patient + options
    return baseApi.get(url, payloads, { headers: getOriginHeader() })
  },
  add: (payloads) => {
    const url = api.patientAllergy.all
    return baseApi.post(url, payloads, { headers: getOriginHeader() })
  },
  update: (payloads, id) => {
    const url = api.patientAllergy.all + `/${id}`
    return baseApi.put(url, payloads, { headers: getOriginHeader() })
  },
}
export default patientAllergy
