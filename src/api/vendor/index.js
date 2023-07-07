import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const vendor = {
  get: (options) => {
    const url = api.vendor.all + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  add: (payloads) => {
    const url = api.vendor.all
    return baseApi.post(url, payloads, { headers: getAuthHeader() })
  },
  update: (payloads, id) => {
    const url = api.vendor.all + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  archive: (payloads, id) => {
    const url = api.vendor.archive + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  activate: (payloads, id) => {
    const url = api.vendor.activate + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  delete: (id) => {
    const url = api.vendor.all + `/${id}`
    return baseApi.delete(url, { headers: getAuthHeader() })
  },
}
export default vendor