import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const patient = {
  get: (payloads, options) => {
    const url = api.patient.all + options
    return baseApi.get(url, payloads, { headers: getOriginHeader() })
  },
  add: (payloads) => {
    const url = api.patient.all
    return baseApi.post(url, payloads, { headers: getOriginHeader() })
  },
  update: (payloads, id) => {
    const url = api.patient.all + `/${id}`
    return baseApi.put(url, payloads, { headers: getOriginHeader() })
  },
  archive: (payloads, id) => {
    const url = api.patient.archive + `/${id}`
    return baseApi.put(url, payloads, { headers: getOriginHeader() })
  },
  activate: (payloads, id) => {
    const url = api.patient.activate + `/${id}`
    return baseApi.put(url, payloads, { headers: getOriginHeader() })
  },
  delete: (payloads, id) => {
    const url = api.patient.all + `/${id}`
    return baseApi.delete(url, payloads, { headers: getOriginHeader() })
  },
}
export default patient
