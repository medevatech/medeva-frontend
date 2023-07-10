import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const shift = {

  add: (payloads) => {
    const url = api.shift.all;
    return baseApi.post(url, payloads, { headers: getAuthHeader() });
  },
  get: (options) => {
    const url = api.shift.all + options;
    return baseApi.get(url, { headers: getAuthHeader() });
  },
  update: (payloads, options) => {
    const url = api.shift.all + options;
    return baseApi.put(url, payloads, { headers: getAuthHeader() });
  },
  getByIdDivision: (options) => {
    const url = api.shift.byDivision + options;
    return baseApi.get(url, { headers: getAuthHeader() });
  },
  getByIdSchedule: (options) => {
    const url = api.shift.bySchedule + options;
    return baseApi.get(url, { headers: getAuthHeader() });
  },
  getByIdEmployee: (options) => {
    const url = api.shift.byEmployee + options;
    return baseApi.get(url, { headers: getAuthHeader() });
  },
  archive: (options) => {
    const url = api.shift.archive + options;
    return baseApi.put(url, { headers: getAuthHeader() });
  },
  activate: (options) => {
    const url = api.shift.activate + options;
    return baseApi.put(url, { headers: getAuthHeader() });
  },
  delete: (id) => {
    const url = api.shift.all + `/${id}`;
    return baseApi.delete(url, { headers: getAuthHeader() });
  },
};

export default shift;
