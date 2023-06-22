import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const partnership = {
  get: (options) => {
    const url = api.partnership.all + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  getDistinct: (options) => {
    const url = api.partnership.distinct + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  getByClinic: (options) => {
    const url = api.partnership.clinic + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  add: (payloads) => {
    const url = api.partnership.all
    return baseApi.post(url, payloads, { headers: getAuthHeader() })
  },
  update: (payloads, id) => {
    const url = api.partnership.all + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  archive: (payloads, id) => {
    const url = api.partnership.archive + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  archiveByClinic: (payloads, id) => {
    const url = api.partnership.archiveByClinic + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  activate: (payloads, id) => {
    const url = api.partnership.activate + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  activateByClinic: (payloads, id) => {
    const url = api.partnership.activateByClinic + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  delete: (id) => {
    const url = api.partnership.all + `/${id}`
    return baseApi.delete(url, { headers: getAuthHeader() })
  },
  deleteByClinic: (id) => {
    const url = api.partnership.deleteByClinic + `/${id}`
    return baseApi.delete(url, { headers: getAuthHeader() })
  },
}
export default partnership
