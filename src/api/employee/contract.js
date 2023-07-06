import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const contract = {
  get: (options) => {
    const url = api.employee.contract + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  getByEmployee: (options) => {
    const url = api.employee.contractByEmployee + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  add: (payloads) => {
    const url = api.employee.contract
    return baseApi.post(url, payloads, { headers: getAuthHeader() })
  },
  update: (payloads, id) => {
    const url = api.employee.contract + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  delete: (id) => {
    const url = api.employee.contract + `/${id}`
    return baseApi.delete(url, { headers: getAuthHeader() })
  },
}
export default contract