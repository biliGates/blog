import {PLAY_MODE, SONG_LIST_MODE} from '@/common/js/vuex.config.js'

const state = {
  songList: [],
  historySongList: [],
  songListMode: SONG_LIST_MODE.current,
  playMode: PLAY_MODE.sequence,
  playingSongIndex: -1,
  topDetail: null,
  playing: false,
  showPlayer: false
}

export default state
