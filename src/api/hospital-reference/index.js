import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const hospitalReference = {
  get: (payloads, options) => {
    const url = api.hospitalReference + options
    return baseApi.get(url, payloads, { headers: getOriginHeader() })
  },
  add: (payloads) => {
    const url = api.hospitalReference
    return baseApi.post(url, payloads, { headers: getOriginHeader() })
  },
  update: (payloads, id) => {
    const url = api.hospitalReference + `/${id}`
    return baseApi.put(url, payloads, { headers: getOriginHeader() })
  },
}
export default hospitalReference