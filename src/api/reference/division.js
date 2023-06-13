import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const division = {
  get: (options) => {
    const url = api.reference.division + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  add: (payloads) => {
    const url = api.reference.division
    return baseApi.post(url, payloads, { headers: getAuthHeader() })
  },
  update: (payloads, id) => {
    const url = api.reference.division + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
}
export default division