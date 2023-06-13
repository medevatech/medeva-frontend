import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const reference = {
  get: (options) => {
    const url = api.reference.all + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  getByRecord: (options) => {
    const url = api.reference.record + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  add: (payloads) => {
    const url = api.reference.all
    return baseApi.post(url, payloads, { headers: getAuthHeader() })
  },
  update: (payloads, id) => {
    const url = api.reference.all + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
}
export default reference
