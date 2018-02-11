const SONG_LIST_KEY = '__list__'
const HISTORY_SONG_LIST_KEY = '__history__'
const FAVORITE_SONG_LIST_KEY = '__favorite__'

const VOLUME_KEY = '__volume__'
const PLAY_SONG_INDEX_KEY = '__index__'
const PLAY_MODE_KEY = '__mode__'

function setSongList (list) {
  localStorage.setItem(SONG_LIST_KEY, JSON.stringify(list))
}
function getSongList () {
  return JSON.parse(localStorage.getItem(SONG_LIST_KEY))
}

function setHistorySongList (list) {
  localStorage.setItem(HISTORY_SONG_LIST_KEY, JSON.stringify(list))
}
function getHistorySongList () {
  return JSON.parse(localStorage.getItem(HISTORY_SONG_LIST_KEY))
}

function setFavoriteSongList (list) {
  localStorage.setItem(FAVORITE_SONG_LIST_KEY, JSON.stringify(list))
}
function getFavoriteSongList () {
  return JSON.parse(localStorage.getItem(FAVORITE_SONG_LIST_KEY))
}

function setVolume (vol) {
  localStorage.setItem(VOLUME_KEY, JSON.stringify(vol))
}
function getVolume () {
  return JSON.parse(localStorage.getItem(VOLUME_KEY))
}

function setPlayingSongIndex (index) {
  localStorage.setItem(PLAY_SONG_INDEX_KEY, JSON.stringify(index))
}
function getPlayingSongIndex () {
  return JSON.parse(localStorage.getItem(PLAY_SONG_INDEX_KEY))
}

function setPlayMode (mode) {
  localStorage.setItem(PLAY_MODE_KEY, JSON.stringify(mode))
}

function getPlayMode () {
  return JSON.parse(localStorage.getItem(PLAY_MODE_KEY))
}

export const getLocalStorage = {
  getSongList,
  getHistorySongList,
  getFavoriteSongList,
  getPlayingSongIndex,
  getVolume,
  getPlayMode
}

export const setLocalStorage = {
  setSongList,
  setHistorySongList,
  setFavoriteSongList,
  setPlayingSongIndex,
  setVolume,
  setPlayMode
}
