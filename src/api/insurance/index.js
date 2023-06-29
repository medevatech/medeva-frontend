import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const insurance = {
  get: (options) => {
    const url = api.insurance.all + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  getMainDashboard: (options) => {
    const url = api.insurance.dashboard + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  getPPSDashboard: (options) => {
    const url = api.insurance.dashboardPPS + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  getPPSDashboardByDoctor: (options) => {
    const url = api.insurance.dashboardPPSByDoctor + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  getFFSPDashboard: (options) => {
    const url = api.insurance.dashboardFFSP + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  getFFSNPDashboard: (options) => {
    const url = api.insurance.dashboardFFNSP + options
    return baseApi.get(url, { headers: getAuthHeader() })
  },
  add: (payloads) => {
    const url = api.insurance.all
    return baseApi.post(url, payloads, { headers: getAuthHeader() })
  },
  update: (payloads, id) => {
    const url = api.insurance.all + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  archive: (payloads, id) => {
    const url = api.insurance.archive + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  activate: (payloads, id) => {
    const url = api.insurance.activate + `/${id}`
    return baseApi.put(url, payloads, { headers: getAuthHeader() })
  },
  delete: (id) => {
    const url = api.insurance.all + `/${id}`
    return baseApi.delete(url, { headers: getAuthHeader() })
  },
}
export default insurance
