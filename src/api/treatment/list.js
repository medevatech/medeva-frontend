import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const list = {
  get: (payloads, options) => {
    const url = api.treatment.list + options
    return baseApi.get(url, payloads, { headers: getOriginHeader() })
  },
  add: (payloads) => {
    const url = api.treatment.list
    return baseApi.post(url, payloads, { headers: getOriginHeader() })
  },
  update: (payloads, id) => {
    const url = api.treatment.list + `/${id}`
    return baseApi.put(url, payloads, { headers: getOriginHeader() })
  },
  getByClinic: (payloads, id) => {
    const url = api.treatment.clinic + `/${id}`
    return baseApi.get(url, payloads, { headers: getOriginHeader() })
  },
}
export default list