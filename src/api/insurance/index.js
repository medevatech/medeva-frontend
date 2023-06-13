import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const insurance = {
  get: (options) => {
    const url = api.insurance.all + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  add: (payloads) => {
    const url = api.insurance.all
    return baseApi.post(url, payloads, { headers: getAuthHeader() })
  },
  update: (payloads, id) => {
    const url = api.insurance.all + id
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  edit: (payloads, id) => {
    const url = api.insurance.all + `${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
}
export default insurance
