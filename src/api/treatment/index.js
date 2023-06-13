import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const treatment = {
  get: (options) => {
    const url = api.treatment.all + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  getByRecord: (options) => {
    const url = api.treatment.record + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  add: (payloads) => {
    const url = api.treatment.all
    return baseApi.post(url, payloads, { headers: getAuthHeader() })
  },
  update: (payloads, id) => {
    const url = api.treatment.all + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
}
export default treatment
