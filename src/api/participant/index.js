import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const participant = {
  get: (options) => {
    const url = api.participant.all + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  getByPatient: (options) => {
    const url = api.participant.patient + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  add: (payloads) => {
    const url = api.participant.all
    return baseApi.post(url, payloads, { headers: getAuthHeader() })
  },
  update: (payloads, id) => {
    const url = api.participant.all + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  delete: (id) => {
    const url = api.participant.all + `/${id}`
    return baseApi.delete(url, { headers: getAuthHeader() })
  },
}
export default participant