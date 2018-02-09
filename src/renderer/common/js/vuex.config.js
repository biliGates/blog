export const SONG_LIST_MODE = {
  history: 0,
  current: 1
}

export const PLAY_MODE = {
  sequence: 0,
  loop: 1,
  random: 2
}

export const SUFFLE_LIST = function (list) {
  let suffleList = []
  list = list.slice()
  while (list.length) {
    suffleList = suffleList.concat(list.splice(Math.ceil(Math.random() * (list.length - 1)), 1))
  }
  return suffleList
}
