import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const inspect = {
  get: (payloads, options) => {
    const url = api.inspect.all + options
    return baseApi.get(url, payloads, { headers: getOriginHeader() })
  },
  add: (payloads) => {
    const url = api.inspect.all
    return baseApi.post(url, payloads, { headers: getOriginHeader() })
  },
  update: (payloads, id) => {
    const url = api.inspect.all + `/${id}`
    return baseApi.put(url, payloads, { headers: getOriginHeader() })
  },
  getByTreatment: (payloads, id) => {
    const url = api.inspect.treatment + `/${id}`
    return baseApi.get(url, payloads, { headers: getOriginHeader() })
  },
}
export default inspect
