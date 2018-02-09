import * as types from './mutation-type'
import {SONG_LIST_MODE} from '@/common/js/vuex.config.js'

const mutations = {
  [types.SET_SONG_LIST] (state, list) {
    state.songList = list
  },
  [types.SET_SONG_LIST_MODE] (state) {
    state.SongListType = state.SongListType === SONG_LIST_MODE.current
      ? SONG_LIST_MODE.history
      : SONG_LIST_MODE.current
  },
  [types.SET_PLAY_MODE] (state, playMode) {
    state.playMode = playMode
  },
  [types.TOGGLE_PLAYER] (state, flag) {
    state.showPlayer = flag !== undefined ? flag : !state.showPlayer
  },
  [types.PLAYING] (state, flag) {
    state.playing = flag !== undefined ? flag : !state.playing
  },
  [types.SET_PLAY_SONG_INDEX] (state, index) {
    state.playingSongIndex = index
  }
}

export default mutations
