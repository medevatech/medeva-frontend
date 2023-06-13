import api from 'constants/api'
import { getAuthHeader, getOriginHeader, serializeQueryParams, getJSONHeader } from 'utils/http'
import baseApi from 'service/api-general'

const auth = {
  login: (payloads) => {
    const url = api.auth.login
    return baseApi.post(url, payloads, { headers: getOriginHeader() })
  }
}
export default auth
