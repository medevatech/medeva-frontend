import api from "constants/api";
import {
  getAuthHeader,
  getOriginHeader,
  serializeQueryParams,
  getJSONHeader,
} from "utils/http";
import baseApi from "service/api-general";

const doctorSchedule = {
  get: (options) => {
    const url = api.doctorSchedule.all + options;
    return baseApi.get(url, { headers: getAuthHeader() });
  },
  add: (payloads) => {
    const url = api.doctorSchedule.all;
    return baseApi.post(url, payloads, { headers: getAuthHeader() });
  },
  update: (payloads, options) => {
    const url = api.doctorSchedule.all + options;
    return baseApi.put(url, payloads, { headers: getAuthHeader() });
  },
  archive: (payloads, options) => {
    const url = api.doctorSchedule.archive + options;
    return baseApi.put(url, payloads, { headers: getAuthHeader() });
  },
  activate: (payloads, options) => {
    const url = api.doctorSchedule.activate + options;
    return baseApi.put(url, payloads, { headers: getAuthHeader() });
  },
  delete: (options) => {
    const url = api.doctorSchedule.all + options;
    return baseApi.delete(url, { headers: getAuthHeader() });
  },
};
export default doctorSchedule;