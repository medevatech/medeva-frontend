export const truncate = (string, length) => {
  return string.length > length ? string.substring(0, length - 3) + '...' : string
}

export const capitalize = (string) => {
  if (string) {
    const arr = string.toLowerCase().split(' ')
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
    }
    return arr.join(' ')
  }
  return ''
}
