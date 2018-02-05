import * as types from './mutation-type'

const mutations = {
  // 当前播放音乐
  [types.PLAY_SONG] (state, song) {
    if (state.playSong !== null && state.playSong.song_id !== song.song_id) {
      state.playSong = song
    } else if (state.playSong === null) {
      state.playSong = song
    }
  },
  [types.PLAY_SONG_PREV] (state, song) {
    state.playSongPrev = song
  },
  [types.PLAY_SONG_NEXT] (state, song) {
    state.playSongNext = song
  },
  // 播放列表
  [types.PLAY_SONG_LIST] (state, songs) {
    state.playSongList = songs
  },
  // 播放器 显示隐藏状态
  [types.SHOW_PLAYER] (state) {
    state.showPlayer = !state.showPlayer
  },
  // 暂停 播放 状态
  [types.TOGGLE_PLAY] (state, play) {
    state.togglePlay = !state.togglePlay
    if (play !== undefined) {
      state.togglePlay = play
    }
  }
}

export default mutations
