import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const treatment = {
  get: (options) => {
    const url = api.lab.treatment + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  getDistinct: (options) => {
    const url = api.lab.treatment + '/distinct' + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  add: (payloads) => {
    const url = api.lab.treatment
    return baseApi.post(url, payloads, { headers: getAuthHeader() })
  },
  update: (payloads, id) => {
    const url = api.lab.treatment + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
}
export default treatment