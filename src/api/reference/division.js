import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const division = {
  get: (payloads, options) => {
    const url = api.reference.division + options
    return baseApi.get(url, payloads, { headers: getOriginHeader() })
  },
  add: (payloads) => {
    const url = api.reference.division
    return baseApi.post(url, payloads, { headers: getOriginHeader() })
  },
  update: (payloads, id) => {
    const url = api.reference.division + `/${id}`
    return baseApi.put(url, payloads, { headers: getOriginHeader() })
  },
}
export default division