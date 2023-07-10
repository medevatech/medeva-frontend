import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const inspect = {
  get: (options) => {
    const url = api.inspect.all + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  getByTreatment: (id) => {
    const url = api.inspect.treatment + `/${id}`
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
  archive: (payloads, id) => {
    const url = api.inspect.archiveInspect + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  activate: (payloads, id) => {
    const url = api.inspect.activateInspect+ `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  delete: (id) => {
    const url = api.inspect.all + `/${id}`
    return baseApi.delete(url, { headers: getAuthHeader() })
  },
}
export default inspect
