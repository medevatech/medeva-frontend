import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const disease = {
  get: (payloads, options) => {
    const url = api.disease.all + options
    return baseApi.get(url, payloads, { headers: getOriginHeader() })
  },
  getAll: (payloads, options) => {
    const url = api.disease.getAll + options
    return baseApi.get(url, payloads, { headers: getOriginHeader() })
  },
  add: (payloads) => {
    const url = api.disease.all
    return baseApi.post(url, payloads, { headers: getOriginHeader() })
  },
  update: (payloads, id) => {
    const url = api.disease.all + `/${id}`
    return baseApi.put(url, payloads, { headers: getOriginHeader() })
  },
}
export default disease