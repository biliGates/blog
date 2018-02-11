import {PLAY_MODE, SONG_LIST_TYPE} from '@/common/js/vuex.config.js'

const state = {
  songList: [],
  historySongList: [],
  favoriteSongList: [],
  playMode: PLAY_MODE.sequence,
  songListType: SONG_LIST_TYPE.current,
  playingSongIndex: -1,
  volume: 10,
  radioStationChennel: null,
  radioStationSong: null,
  needPrevSong: false,
  radioStationMode: false,
  playing: false,
  showPlayer: false,
  intialData: null
}

export default state
