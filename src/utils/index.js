import { getAuthHeader, getOriginHeader, getAuthAndMultipartHeader, getJSONHeader } from './http'
import { serializeQueryParams } from './query'
import { truncate, capitalize } from './string'
import { currencyFormat } from './currency'
import { formatDate, formatFullDate, formatFullDateMinusDay } from './date'
import { twoDigits } from './digit'

export {
  getAuthHeader,
  getOriginHeader,
  getAuthAndMultipartHeader,
  getJSONHeader,
  serializeQueryParams,
  truncate,
  capitalize,
  currencyFormat,
  formatDate,
  formatFullDate,
  formatFullDateMinusDay,
  twoDigits
}
