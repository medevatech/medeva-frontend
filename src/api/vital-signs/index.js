import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const vitalSigns = {
  get: (payloads, options) => {
    const url = api.vitalSigns.all + options
    return baseApi.get(url, payloads, { headers: getOriginHeader() })
  },
  getByPatient: (payloads, options) => {
    const url = api.vitalSigns.patient + options
    return baseApi.get(url, payloads, { headers: getOriginHeader() })
  },
  add: (payloads) => {
    const url = api.vitalSigns.all
    return baseApi.post(url, payloads, { headers: getOriginHeader() })
  },
  update: (payloads, id) => {
    const url = api.vitalSigns.all + `/${id}`
    return baseApi.put(url, payloads, { headers: getOriginHeader() })
  }
}
export default vitalSigns
