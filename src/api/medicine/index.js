import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const medicine = {
  get: (payloads, options) => {
    const url = api.medicine + options
    return baseApi.get(url, payloads, { headers: getOriginHeader() })
  },
  add: (payloads) => {
    const url = api.medicine
    return baseApi.post(url, payloads, { headers: getOriginHeader() })
  },
  update: (payloads, id) => {
    const url = api.medicine + `/${id}`
    return baseApi.put(url, payloads, { headers: getOriginHeader() })
  },
}
export default medicine