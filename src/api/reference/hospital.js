import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const hospital = {
  get: (options) => {
    const url = api.reference.hospital + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  add: (payloads) => {
    const url = api.reference.hospital
    return baseApi.post(url, payloads, { headers: getAuthHeader() })
  },
  update: (payloads, id) => {
    const url = api.reference.hospital + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
}
export default hospital