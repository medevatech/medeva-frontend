import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const lab = {
  get: (options) => {
    const url = api.lab.all + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  add: (payloads) => {
    const url = api.lab.all
    return baseApi.post(url, payloads, { headers: getAuthHeader() })
  },
  update: (payloads, id) => {
    const url = api.lab.all + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
}
export default lab