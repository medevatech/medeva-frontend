import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const list = {
  get: (options) => {
    const url = api.treatment.list + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  getByClinic: (id) => {
    const url = api.treatment.clinicList + `/${id}`
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  add: (payloads) => {
    const url = api.treatment.list
    return baseApi.post(url, payloads, { headers: getAuthHeader() })
  },
  update: (payloads, id) => {
    const url = api.treatment.list + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  archive: (payloads, id) => {
    const url = api.treatment.archiveList + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  activate: (payloads, id) => {
    const url = api.treatment.activateList + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  delete: (payloads, id) => {
    const url = api.treatment.list + `/${id}`
    return baseApi.delete(url, payloads, { headers: getAuthHeader() })
  },
}
export default list