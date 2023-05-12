import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const diagnoseReference = {
  get: (payloads, options) => {
    const url = api.diagnoseReference + options
    return baseApi.get(url, payloads, { headers: getOriginHeader() })
  },
  add: (payloads) => {
    const url = api.diagnoseReference
    return baseApi.post(url, payloads, { headers: getOriginHeader() })
  },
  update: (payloads, id) => {
    const url = api.diagnoseReference + `/${id}`
    return baseApi.put(url, payloads, { headers: getOriginHeader() })
  },
}
export default diagnoseReference