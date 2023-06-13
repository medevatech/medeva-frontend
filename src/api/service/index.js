import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const service = {
  get: (options) => {
    const url = api.service.all + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  getByRecord: (options) => {
    const url = api.service.record + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  add: (payloads) => {
    const url = api.service.all
    return baseApi.post(url, payloads, { headers: getAuthHeader() })
  },
  update: (payloads, id) => {
    const url = api.service.all + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  delete: (payloads, id) => {
    const url = api.service.all + `/${id}`
    return baseApi.delete(url, payloads, { headers: getAuthHeader() })
  },
}
export default service
