export const SUFFLE_LIST = function (list) {
  let suffleList = []
  list = list.slice()
  while (list.length) {
    suffleList = suffleList.concat(list.splice(Math.ceil(Math.random() * (list.length - 1)), 1))
  }
  return suffleList
}
