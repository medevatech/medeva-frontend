import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const vitalSigns = {
  all: (payloads) => {
    const url = api.vitalSigns
    return baseApi.post(url, payloads, { headers: getOriginHeader() })
  }
}
export default vitalSigns
