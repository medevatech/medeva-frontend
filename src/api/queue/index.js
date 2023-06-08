import api from "constants/api";
import {
  getAuthHeader,
  getOriginHeader,
  serializeQueryParams,
  getJSONHeader,
} from "utils/http";
import baseApi from "service/api-general";

const queue = {
  get: (payloads, options) => {
    const url = api.queue + options;
    return baseApi.get(url, payloads, { headers: getOriginHeader() });
  },
  getById: (payloads, options) => {
    const url = api.queue + options;
    return baseApi.get(url, payloads, { headers: getOriginHeader() });
  },
  add: (payloads) => {
    const url = api.queue;
    return baseApi.post(url, payloads, { headers: getOriginHeader() });
  },
  update: (payloads, id) => {
    const url = api.queue + `/prioritas/${id}`;
    return baseApi.put(url, payloads, { headers: getOriginHeader() });
  },
  delete: (payloads, id) => {
    const url = api.queue + `/${id}`;
    return baseApi.delete(url, payloads, { headers: getOriginHeader() });
  },
};
export default queue;
