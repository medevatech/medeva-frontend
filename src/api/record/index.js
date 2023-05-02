import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const record = {
  get: (payloads, options) => {
    const url = api.record.all + options
    return baseApi.get(url, payloads, { headers: getOriginHeader() })
  },
  getByPatient: (payloads, options) => {
    const url = api.record.patient + options
    return baseApi.get(url, payloads, { headers: getOriginHeader() })
  },
  add: (payloads) => {
    const url = api.record.all
    return baseApi.post(url, payloads, { headers: getOriginHeader() })
  },
  update: (payloads, id) => {
    const url = api.record.all + `/${id}`
    return baseApi.put(url, payloads, { headers: getOriginHeader() })
  }
}
export default record
