import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const treatmentList = {
  get: (payloads, options) => {
    const url = api.treatmentList + options
    return baseApi.get(url, payloads, { headers: getOriginHeader() })
  },
  add: (payloads) => {
    const url = api.treatmentList
    return baseApi.post(url, payloads, { headers: getOriginHeader() })
  },
  update: (payloads, id) => {
    const url = api.treatmentList + `/${id}`
    return baseApi.put(url, payloads, { headers: getOriginHeader() })
  },
}
export default treatmentList