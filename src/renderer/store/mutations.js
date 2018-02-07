import * as types from './mutation-type'
import {PLAY_MODE, SONG_LIST_MODE} from '@/common/js/vuex.config.js'

const mutations = {
  [types.SET_SONG_LIST] (state, list) {
    state.songList = list
  },
  [types.SET_SONG_LIST_MODE] (state) {
    state.SongListType = state.SongListType === SONG_LIST_MODE.current
      ? SONG_LIST_MODE.history
      : SONG_LIST_MODE.current
  },
  [types.SET_PLAY_MODE] (state) {
    let mode = state.PLAY_MODE
    state.playMode = (mode === PLAY_MODE.sequense && PLAY_MODE.loop) ||
      (mode === PLAY_MODE.loop && PLAY_MODE.random) ||
      (mode === PLAY_MODE.random && PLAY_MODE.sequense)
  },
  [types.TOGGLE_PLAYER] (state, flag) {
    state.showPlayer = flag !== undefined ? flag : !state.showPlayer
  },
  [types.PLAYING] (state) {
    state.playing = !state.playing
  },
  [types.CHANGE_PLAY_SONG_INDEX] (state, index) {
    state.playingSongIndex = index
  }
}

export default mutations
