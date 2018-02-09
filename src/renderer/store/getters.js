import {SONG_LIST_MODE, PLAY_MODE, SUFFLE_LIST} from '@/common/js/vuex.config.js'

export const songList = state => {
  let list = state.songListMode === SONG_LIST_MODE.current
    ? state.songList.slice()
    : state.historySongList.slice()
  return state.playMode === PLAY_MODE.random ? SUFFLE_LIST(list) : list
}

export const playingSong = state => state.songList[state.playingSongIndex + 1]

export const playMode = state => state.playMode

export const playingSongId = state => {
  let index = state.playingSongIndex + 1
  return (state.songList[index] && state.songList[index].song_id) || null
}

export const playing = state => state.playing

export const showPlayer = state => state.showPlayer

export const songAmount = state => state.songList.length

export const topDetail = state => state.topDetail
