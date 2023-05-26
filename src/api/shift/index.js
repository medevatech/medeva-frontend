import api from "constants/api";
import {
  getAuthHeader,
  getOriginHeader,
  serializeQueryParams,
  getJSONHeader,
} from "utils/http";
import baseApi from "service/api-general";

const shift = {
  get: (payloads, options) => {
    const url = api.shift.all + options;
    return baseApi.get(url, payloads, { headers: getOriginHeader() });
  },
  getByClinic: (payloads, options) => {
    const url = api.shift.all.byClinic + options;
    return baseApi.get(url, payloads, { headers: getOriginHeader() });
  },
  add: (payloads) => {
    const url = api.shift.all;
    return baseApi.post(url, payloads, { headers: getOriginHeader() });
  },
  archive: (payloads, id) => {
    const url = api.shift.archive + `/${id}`;
    return baseApi.post(url, payloads, { headers: getOriginHeader() });
  },
  activate: (payloads, id) => {
    const url = api.shift.activate + `/${id}`;
    return baseApi.post(url, payloads, { headers: getOriginHeader() });
  },
  delete: (payloads, id) => {
    const url = api.shift.delete + `/${id}`;
    return baseApi.delete(url, payloads, { headers: getOriginHeader() });
  },
};
export default shift;
