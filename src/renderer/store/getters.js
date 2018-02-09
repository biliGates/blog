import {PLAY_MODE, SONG_LIST_TYPE} from '@/common/js/vuex.config.js'
import {SUFFLE_LIST} from '@/common/js/suffle-list'

export const songList = state => {
  let list = state.songListType === SONG_LIST_TYPE.current
    ? state.songList.slice()
    : state.historySongList.slice()
  return state.playMode === PLAY_MODE.random ? SUFFLE_LIST(list) : list
}

export const songListType = state => state.songListType

export const historySongList = state => state.historySongList

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
