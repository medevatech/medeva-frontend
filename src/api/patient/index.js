import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const patient = {
  get: (payloads, options) => {
    const url = api.patient + options
    return baseApi.get(url, payloads, { headers: getOriginHeader() })
  },
  add: (payloads) => {
    const url = api.patient
    return baseApi.post(url, payloads, { headers: getOriginHeader() })
  },
  update: (payloads, id) => {
    const url = api.patient + `/${id}`
    return baseApi.put(url, payloads, { headers: getOriginHeader() })
  },
}
export default patient
