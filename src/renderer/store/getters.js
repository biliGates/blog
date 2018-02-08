import {SONG_LIST_MODE} from '@/common/js/vuex.config.js'

export const songList = state => {
  let list = state.songListMode === SONG_LIST_MODE.current
    ? state.songList
    : state.historySongList
  return list
}

export const playingSong = state => state.songList[state.playingSongIndex + 1]

export const playMode = state => state.playMode

export const playingSongId = state => (state.songList[state.playingSongIndex + 1] && state.songList[state.playingSongIndex + 1].song_id) || null

export const playing = state => state.playing

export const showPlayer = state => state.showPlayer

export const songAmount = state => state.songList.length
