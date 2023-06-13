import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const medicine = {
  get: (options) => {
    const url = api.medicine + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  add: (payloads) => {
    const url = api.medicine
    return baseApi.post(url, payloads, { headers: getAuthHeader() })
  },
  update: (payloads, id) => {
    const url = api.medicine + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
}
export default medicine