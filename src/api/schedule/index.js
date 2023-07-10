import api from "constants/api";
import {
  getAuthHeader,
  getOriginHeader,
  serializeQueryParams,
  getJSONHeader,
} from "utils/http";
import baseApi from "service/api-general";

const schedule = {
  get: (options) => {
    const url = api.schedule.all + options;
    return baseApi.get(url, { headers: getAuthHeader() });
  },
  getByDivision: (options) => {
    const url = api.schedule.byDivision + options;
    return baseApi.get(url, { headers: getAuthHeader() });
  },
  getByEmployee: (options) => {
    const url = api.schedule.byEmployee + options;
    return baseApi.get(url, { headers: getAuthHeader() });
  },
  getDistinct: (options) => {
    const url = api.schedule.distinct + options;
    return baseApi.get(url, { headers: getAuthHeader() });
  },
  getToday: (options) => {
    const url = api.schedule.today + options;
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
  delete: (payloads, id) => {
    const url = api.schedule.all + `/${id}`;
    return baseApi.delete(url, payloads, { headers: getAuthHeader() });
  },
};
export default schedule;