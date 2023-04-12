export const currencyFormat = (value) => {
  if (typeof value === 'number') {
    return 'Rp' + String(value).replace(/(.)(?=(\d{3})+$)/g, '$1.')
  } else if (typeof value !== 'undefined') {
    var index = value.search(/Rp/i)
    if (index < 0) return 'Rp' + 0
    var price = parseFloat(
      String(value)
        .replace('Rp', '')
        .replace(/[.,\s]/g, '')
    )
    return 'Rp' + String(price).replace(/(.)(?=(\d{3})+$)/g, '$1.')
  }
}
