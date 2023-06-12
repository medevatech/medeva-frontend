import api from "constants/api";
import {
  getAuthHeader,
  getOriginHeader,
  serializeQueryParams,
  getJSONHeader,
} from "utils/http";
import baseApi from "service/api-general";

const schedule = {
  get: (payloads, options) => {
    const url = api.schedule.all + options;
    return baseApi.get(url, payloads, { headers: getOriginHeader() });
  },
  add: (payloads) => {
    const url = api.schedule.all;
    return baseApi.post(url, payloads, { headers: getOriginHeader() });
  },
  getByDivision: (payloads, options) => {
    const url = api.schedule.ondvs + options;
    return baseApi.get(url, payloads, { headers: getOriginHeader() });
  },
  getByEmployee: (payloads, options) => {
    const url = api.schedule.onemployee + options;
    return baseApi.get(url, payloads, { headers: getOriginHeader() });
  },
  update: (payloads, id) => {
    const url = api.schedule.all + `/${id}`;
    return baseApi.put(url, payloads, { headers: getOriginHeader() });
  },
  archive: (payloads, id) => {
    const url = api.schedule.archive + `/${id}`;
    return baseApi.put(url, payloads, { headers: getOriginHeader() });
  },
  activate: (payloads, id) => {
    const url = api.schedule.activate + `/${id}`;
    return baseApi.put(url, payloads, { headers: getOriginHeader() });
  },
  delete: (payloads, id) => {
    const url = api.schedule.all + `/${id}`;
    return baseApi.delete(url, payloads, { headers: getOriginHeader() });
  },
};
export default schedule;