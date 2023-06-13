import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const kelas = {
  get: (options) => {
    const url = api.insurance.class + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  getByInsurance: (options) => {
    const url = api.insurance.classByInsurance + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  add: (payloads) => {
    const url = api.insurance.class
    return baseApi.post(url, payloads, { headers: getAuthHeader() })
  },
  update: (payloads, id) => {
    const url = api.insurance.class + `${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  edit: (payloads, id) => {
    const url = api.insurance.class + `${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
}
export default kelas
