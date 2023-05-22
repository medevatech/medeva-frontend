import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const kelas = {
  get: (payloads, options) => {
    const url = api.insurance.class + options
    return baseApi.get(url, payloads, { headers: getOriginHeader() })
  },
  getByInsurance: (payloads, options) => {
    const url = api.insurance.classByInsurance + options
    return baseApi.get(url, payloads, { headers: getOriginHeader() })
  },
  add: (payloads) => {
    const url = api.insurance.class
    return baseApi.post(url, payloads, { headers: getOriginHeader() })
  },
  update: (payloads, id) => {
    const url = api.insurance.class + `${id}`
    return baseApi.put(url, payloads, { headers: getOriginHeader() })
  },
  edit: (payloads, id) => {
    const url = api.insurance.class + `${id}`
    return baseApi.put(url, payloads, { headers: getOriginHeader() })
  },
}
export default kelas
