import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const diagnose = {
  get: (options) => {
    const url = api.reference.diagnose + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  getByRecord: (options) => {
    const url = api.reference.diagnoseByRecord + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  getByReference: (options) => {
    const url = api.reference.diagnoseByReference + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  add: (payloads) => {
    const url = api.reference.diagnose
    return baseApi.post(url, payloads, { headers: getAuthHeader() })
  },
  update: (payloads, id) => {
    const url = api.reference.diagnose + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  delete: (id) => {
    const url = api.reference.diagnose + `/${id}`
    return baseApi.delete(url, { headers: getAuthHeader() })
  },
}
export default diagnose