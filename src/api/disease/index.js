import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const disease = {
  get: (payloads, options) => {
    const url = api.disease + options
    return baseApi.get(url, payloads, { headers: getOriginHeader() })
  },
  add: (payloads) => {
    const url = api.disease
    return baseApi.post(url, payloads, { headers: getOriginHeader() })
  },
  update: (payloads, id) => {
    const url = api.disease + `/${id}`
    return baseApi.put(url, payloads, { headers: getOriginHeader() })
  },
}
export default disease
