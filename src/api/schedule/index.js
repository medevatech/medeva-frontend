import api from "constants/api";
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from "utils/http";
import baseApi from "service/api-general";

const schedule = {
  get: (options) => {
    const url = api.schedule.all + options;
    return baseApi.get(url, { headers: getAuthHeader() });
  },
  getByDivision: (options) => {
    const url = api.schedule.ondvs + options;
    return baseApi.get(url, { headers: getAuthHeader() });
  },
  getByEmployee: (options) => {
    const url = api.schedule.onemployee + options;
    return baseApi.get(url, { headers: getAuthHeader() });
  },
  add: (payloads) => {
    const url = api.schedule.all;
    return baseApi.post(url, payloads, { headers: getAuthHeader() });
  },
  update: (payloads, id) => {
    const url = api.schedule.all + `/${id}`;
    return baseApi.put(url, payloads, { headers: getAuthHeader() });
  },
  archive: (payloads, id) => {
    const url = api.schedule.archive + `/${id}`;
    return baseApi.put(url, payloads, { headers: getAuthHeader() });
  },
  activate: (payloads, id) => {
    const url = api.schedule.activate + `/${id}`;
    return baseApi.put(url, payloads, { headers: getAuthHeader() });
  },
  delete: (id) => {
    const url = api.schedule.all + `/${id}`;
    return baseApi.delete(url, { headers: getAuthHeader() });
  },
};
export default schedule;