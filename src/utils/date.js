import dayjs from 'dayjs'
const formatFullDate = (value) => {
  if (value) {
    return dayjs(String(value)).format('DD MMMM YYYY')
  }
}
const formatDate = (value) => {
  if (value) {
    return dayjs(String(value)).format('DD MMM YYYY')
  }
}
const formatFullDateMinusDay = (value, days) => {
  if (value) {
    return dayjs(String(value)).subtract(days, 'days').format('DD MMMM YYYY')
  }
}
export { formatDate, formatFullDate, formatFullDateMinusDay }
