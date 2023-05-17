import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const participant = {
  get: (payloads, options) => {
    const url = api.participant + options
    return baseApi.get(url, payloads, { headers: getOriginHeader() })
  },
  add: (payloads) => {
    const url = api.participant
    return baseApi.post(url, payloads, { headers: getOriginHeader() })
  },
  update: (payloads, id) => {
    const url = api.participant + id
    return baseApi.put(url, payloads, { headers: getOriginHeader() })
  },
  edit: (payloads, id) => {
    const url = api.participant + `${id}`
    return baseApi.put(url, payloads, { headers: getOriginHeader() })
  },
}
export default participant