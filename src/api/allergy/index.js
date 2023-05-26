import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const allergy = {
  get: (payloads, options) => {
    const url = api.allergy + options
    return baseApi.get(url, payloads, { headers: getOriginHeader() })
  },
  add: (payloads) => {
    const url = api.allergy
    return baseApi.post(url, payloads, { headers: getOriginHeader() })
  },
  update: (payloads, id) => {
    const url = api.allergy + `/${id}`
    return baseApi.put(url, payloads, { headers: getOriginHeader() })
  },
}
export default allergy
