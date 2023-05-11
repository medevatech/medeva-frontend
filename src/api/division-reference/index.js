import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const divisionReference = {
  get: (payloads, options) => {
    const url = api.divisionReference + options
    return baseApi.get(url, payloads, { headers: getOriginHeader() })
  },
  add: (payloads) => {
    const url = api.divisionReference
    return baseApi.post(url, payloads, { headers: getOriginHeader() })
  },
  update: (payloads, id) => {
    const url = api.divisionReference + `/${id}`
    return baseApi.put(url, payloads, { headers: getOriginHeader() })
  },
}
export default divisionReference