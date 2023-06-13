import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const schedule = {
  all: (payloads) => {
    const url = api.schedule
    return baseApi.post(url, payloads, { headers: getAuthHeader() })
  }
}
export default schedule
