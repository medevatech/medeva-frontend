import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const treatment = {
  get: (payloads, options) => {
    const url = api.treatment.all + options
    return baseApi.get(url, payloads, { headers: getOriginHeader() })
  },
  getByRecord: (payloads, options) => {
    const url = api.treatment.record + options
    return baseApi.get(url, payloads, { headers: getOriginHeader() })
  },
  add: (payloads) => {
    const url = api.treatment.all
    return baseApi.post(url, payloads, { headers: getOriginHeader() })
  },
  update: (payloads, id) => {
    const url = api.treatment.all + `/${id}`
    return baseApi.put(url, payloads, { headers: getOriginHeader() })
  },
}
export default treatment
