import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const labTreatment = {
  get: (payloads, options) => {
    const url = api.labTreatment + options
    return baseApi.get(url, payloads, { headers: getOriginHeader() })
  },
  getDistinct: (payloads, options) => {
    const url = api.labTreatment + '/distinct' + options
    return baseApi.get(url, payloads, { headers: getOriginHeader() })
  },
  add: (payloads) => {
    const url = api.labTreatment
    return baseApi.post(url, payloads, { headers: getOriginHeader() })
  },
  update: (payloads, id) => {
    const url = api.labTreatment + `/${id}`
    return baseApi.put(url, payloads, { headers: getOriginHeader() })
  },
}
export default labTreatment