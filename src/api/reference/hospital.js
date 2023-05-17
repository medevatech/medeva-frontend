import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const hospital = {
  get: (payloads, options) => {
    const url = api.reference.hospital + options
    return baseApi.get(url, payloads, { headers: getOriginHeader() })
  },
  add: (payloads) => {
    const url = api.reference.hospital
    return baseApi.post(url, payloads, { headers: getOriginHeader() })
  },
  update: (payloads, id) => {
    const url = api.reference.hospital + `/${id}`
    return baseApi.put(url, payloads, { headers: getOriginHeader() })
  },
}
export default hospital