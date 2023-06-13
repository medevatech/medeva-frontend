import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const temp = {
  all: (payloads) => {
    const url = api.record.temp
    return baseApi.post(url, payloads, { headers: getAuthHeader() })
  }
}
export default temp
