import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const record = {
  get: (options) => {
    const url = api.record.all + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  getByPatient: (options) => {
    const url = api.record.patient + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  add: (payloads) => {
    const url = api.record.all
    return baseApi.post(url, payloads, { headers: getAuthHeader() })
  },
  update: (payloads, id) => {
    const url = api.record.all + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  }
}
export default record
