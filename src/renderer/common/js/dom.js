export const setCss = (el, css) => {
  if (typeof css === 'object') {
    for (let key in css) {
      let value = css[key]
      el.style[key] = isNaN(value) ? value : `${value}px`
    }
  } else {
    let [key, value] = css.split(':')
    el.style[key] = isNaN(value) ? value : `${value}px`
  }
}

export const getCss = (el, attr) => {
  return el.style[attr]
    ? el.style[attr]
    : (el.currentStyle
      ? el.currentStyle[attr]
      : window.getComputedStyle(el, null)[attr])
}
