import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const vitalSigns = {
  get: (options) => {
    const url = api.vitalSigns.all + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  getByPatient: (options) => {
    const url = api.vitalSigns.patient + options
    console.log('options', options)
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  add: (payloads) => {
    const url = api.vitalSigns.all
    return baseApi.post(url, payloads, { headers: getAuthHeader() })
  },
  update: (payloads, id) => {
    const url = api.vitalSigns.all + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  delete: (id) => {
    const url = api.vitalSigns.all + `/${id}`
    return baseApi.delete(url, { headers: getAuthHeader() })
  }
}
export default vitalSigns
