import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const list = {
  get: (payloads, options) => {
    const url = api.service.list + options
    return baseApi.get(url, payloads, { headers: getOriginHeader() })
  },
  add: (payloads) => {
    const url = api.service.list
    return baseApi.post(url, payloads, { headers: getOriginHeader() })
  },
  update: (payloads, id) => {
    const url = api.service.list + `/${id}`
    return baseApi.put(url, payloads, { headers: getOriginHeader() })
  },
  getByClinic: (payloads, id) => {
    const url = api.service.clinicList + `/${id}`
    return baseApi.get(url, payloads, { headers: getOriginHeader() })
  },
  archive: (payloads, id) => {
    const url = api.service.archiveList + `/${id}`
    return baseApi.put(url, payloads, { headers: getOriginHeader() })
  },
  activate: (payloads, id) => {
    const url = api.service.activateList + `/${id}`
    return baseApi.put(url, payloads, { headers: getOriginHeader() })
  },
  delete: (payloads, id) => {
    const url = api.service.list + `/${id}`
    return baseApi.delete(url, payloads, { headers: getOriginHeader() })
  },
}
export default list