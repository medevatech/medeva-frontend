import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const clinic = {
  get: (payloads) => {
    const url = api.clinic.all
    return baseApi.get(url, payloads, { headers: getOriginHeader() })
  },
  add: (payloads) => {
    const url = api.clinic.all
    return baseApi.post(url, payloads, { headers: getOriginHeader() })
  },
  update: (payloads) => {
    const url = api.clinic.all
    return baseApi.put(url, payloads, { headers: getOriginHeader() })
  },
}
export default clinic
