import * as types from './mutation-type'
import {SONG_LIST_TYPE} from '@/common/js/vuex.config'

const mutations = {
  [types.SET_SONG_LIST] (state, list) {
    state.songList = list
  },
  [types.SET_PLAY_MODE] (state, playMode) {
    state.playMode = playMode
  },
  [types.SET_SONG_LIST_TYPE] (state, type) {
    state.songListType = type
  },
  [types.TOGGLE_PLAYER] (state, flag) {
    state.showPlayer = flag !== undefined ? flag : !state.showPlayer
  },
  [types.PLAYING] (state, flag) {
    state.playing = flag !== undefined ? flag : !state.playing
  },
  [types.SET_PLAY_SONG_INDEX] (state, index) {
    state.playingSongIndex = index
  },
  [types.SET_HISTORY_SONG_LIST] (state, list) {
    state.historySongList = list
  },
  [types.DELECT_SONG] (state, index) {
    state.songListType === SONG_LIST_TYPE.current
      ? state.songList.splice(index, 1)
      : state.historySongList.splice(index, 1)
  },
  [types.SET_RADIO_STATION_MODE] (state, mode) {
    state.radioStationMode = mode
  },
  [types.SET_RADIO_STATION_CHENNEL] (state, channel) {
    state.radioStationChennel = channel
  },
  [types.SET_RADIO_STATION_SONG] (state, song) {
    state.radioStationSong = song
  },
  [types.NEED_PREV_SONG] (state, flag) {
    state.needPrevSong = flag
  },
  [types.SET_FAVORITE_SONG_LIST] (state, list) {
    state.favoriteSongList = list
  },
  [types.DELECT_FAVORITE_SONG] (state, list) {
    state.favoriteSongList = list
  },
  [types.SET_VOLUME] (state, vol) {
    state.volume = vol
  }
}

export default mutations
