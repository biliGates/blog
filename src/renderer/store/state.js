import {PLAY_MODE, SONG_LIST_TYPE} from '@/common/js/vuex.config.js'

const state = {
  songList: [],
  historySongList: [],
  playMode: PLAY_MODE.sequence,
  songListType: SONG_LIST_TYPE.current,
  playingSongIndex: -1,
  playing: false,
  showPlayer: false,
  intialData: null
}

export default state
