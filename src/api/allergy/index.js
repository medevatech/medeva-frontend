import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const allergy = {
  get: (options) => {
    const url = api.allergy + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  add: (payloads) => {
    const url = api.allergy
    return baseApi.post(url, payloads, { headers: getAuthHeader() })
  },
  update: (payloads, id) => {
    const url = api.allergy + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
}
export default allergy
