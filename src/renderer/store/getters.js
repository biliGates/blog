import {SONG_LIST_TYPE} from '@/common/js/vuex.config.js'

export const songList = state => {
  return state.songListType === SONG_LIST_TYPE.current
    ? state.songList
    : state.historySongList
}

export const songListType = state => state.songListType

export const playingSong = state => state.songList[state.playingSongIndex + 1]

export const playMode = state => state.playMode

export const playingSongId = state => {
  let index = state.playingSongIndex + 1
  return state.songList[index] && state.songList[index].song_id
}

export const playing = state => state.playing

export const showPlayer = state => state.showPlayer

export const songAmount = state => state.songList.length

export const topDetail = state => state.topDetail

export const radioStationSong = state => state.radioStationSong

export const radioStationMode = state => state.radioStationMode

export const radioStationChennel = state => state.radioStationChennel

export const needPrevSong = state => state.needPrevSong

export const favoriteSongList = state => state.favoriteSongList

export const volume = state => state.volume

export const favoriteSong = state => {
  state.favoriteSongList.forEach((favoriteSong) => {
    if (favoriteSong.song_id === state.songList[state.playingSongIndex + 1]) {
      return true
    }
  })
}
