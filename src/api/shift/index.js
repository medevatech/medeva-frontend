import api from "constants/api";
import {
  getAuthHeader,
  getOriginHeader,
  serializeQueryParams,
  getJSONHeader,
} from "utils/http";
import baseApi from "service/api-general";

const shift = {
  all: (payloads, options) => {
    const url = api.shift + options;
    return baseApi.post(url, payloads, { headers: getOriginHeader() });
  },
  add: (payloads) => {
    const url = api.shift;
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
};
export default shift;
