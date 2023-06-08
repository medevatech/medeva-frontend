import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const support = {
  get: (payloads) => {
    const url = api.inspect.support
    return baseApi.get(url, payloads, { headers: getOriginHeader() })
  },
  getByRecord: (payloads, options) => {
    const url = api.inspect.supportByRecord + options
    return baseApi.get(url, payloads, { headers: getOriginHeader() })
  },
  add: (payloads) => {
    const url = api.inspect.support
    return baseApi.post(url, payloads, { headers: getOriginHeader() })
  },
  update: (payloads, id) => {
    const url = api.inspect.support + `/${id}`
    return baseApi.put(url, payloads, { headers: getOriginHeader() })
  },
  delete: (payloads, id) => {
    const url = api.inspect.support + `/${id}`
    return baseApi.delete(url, payloads, { headers: getOriginHeader() })
  },
}
export default support
