import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const queue = {
  get: (options) => {
    const url = api.queue + options;
    return baseApi.get(url, { headers: getAuthHeader() });
  },
  add: (payloads) => {
    const url = api.queue;
    return baseApi.post(url, payloads, { headers: getAuthHeader() });
  },
  update: (payloads, id) => {
    const url = api.queue + `/prioritas/${id}`;
    return baseApi.put(url, payloads, { headers: getAuthHeader() });
  },
};
export default queue;
