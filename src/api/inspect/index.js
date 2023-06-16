import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const inspect = {
  get: (options) => {
    const url = api.inspect.all + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  add: (payloads) => {
    const url = api.inspect.all
    return baseApi.post(url, payloads, { headers: getAuthHeader() })
  },
  update: (payloads, id) => {
    const url = api.inspect.all + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  getByTreatment: (id) => {
    const url = api.inspect.treatment + `/${id}`
    return baseApi.get(url, { headers: getAuthHeader() })
  },
}
export default inspect
