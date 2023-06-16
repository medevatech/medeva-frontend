import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const diagnose = {
  get: (options) => {
    const url = api.diagnose.all + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  getByRecord: (options) => {
    const url = api.diagnose.record + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  add: (payloads) => {
    const url = api.diagnose.all
    return baseApi.post(url, payloads, { headers: getAuthHeader() })
  },
  update: (payloads, id) => {
    const url = api.diagnose.all + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  delete: (id) => {
    const url = api.diagnose.all + `/${id}`
    return baseApi.delete(url, { headers: getAuthHeader() })
  },
}
export default diagnose
