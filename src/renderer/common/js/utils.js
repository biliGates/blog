export const supplementElement = (arr, rows) => {
  for (let i = 0; i < arr.length % rows; i++) {
    arr.push('')
  }
  return arr
}

export const collatingText = (text) => {
  text = text.replace(/\n/g, '<br>')
  text = text.replace(/\s/g, '&nbsp;&nbsp;')
  return text
}

export const toTwo = (n) => {
  return n < 10 ? (n <= 0 ? '00' : `0${n}`) : `${n}`
}

export const getTime = (time) => {
  let min = Math.floor(time / 60)
  let sec = Math.round(time - (min * 60))
  return `${toTwo(min)}:${toTwo(sec)}`
}

export const icons = (icon) => {
  let i = []
  new RegExp('lossless').test(icon) && i.push('SQ')
  new RegExp('vip').test(icon) && i.push('VIP')
  return i
}
