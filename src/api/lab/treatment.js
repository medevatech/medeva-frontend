import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const treatment = {
  get: (payloads, options) => {
    const url = api.lab.treatment + options
    return baseApi.get(url, payloads, { headers: getOriginHeader() })
  },
  getDistinct: (payloads, options) => {
    const url = api.lab.treatment + '/distinct' + options
    return baseApi.get(url, payloads, { headers: getOriginHeader() })
  },
  add: (payloads) => {
    const url = api.lab.treatment
    return baseApi.post(url, payloads, { headers: getOriginHeader() })
  },
  update: (payloads, id) => {
    const url = api.lab.treatment + `/${id}`
    return baseApi.put(url, payloads, { headers: getOriginHeader() })
  },
}
export default treatment