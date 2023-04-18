import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const tempRecord = {
  all: (payloads) => {
    const url = api.tempRecord
    return baseApi.post(url, payloads, { headers: getOriginHeader() })
  }
}
export default tempRecord
