import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const queue = {
  get: (options) => {
    const url = api.queue.all + options;
    return baseApi.get(url, { headers: getAuthHeader() });
  },
  getByScheduleId: (options) => {
    const url = api.queue.byDivision + options;
    return baseApi.get(url, { headers: getAuthHeader() });
  },
  add: (payloads) => {
    const url = api.queue.all;
    return baseApi.post(url, payloads, { headers: getAuthHeader() });
  },
  update: (payloads, id) => {
    const url = api.queue.all + `/${id}`;
    return baseApi.put(url, payloads, { headers: getAuthHeader() });
  },
  delete: (id) => {
    const url = api.queue.all + `/${id}`;
    return baseApi.delete(url, { headers: getAuthHeader() });
  },
};
export default queue;
