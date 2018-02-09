import * as types from './mutation-type'

export const playingSong = function ({commit, state}, song) {
  let flag = true
  let songList = state.songList.slice()
  let index = 0
  songList.forEach((oldSong, i) => {
    if (oldSong.song_id === song.song_id) {
      flag = false
      index = i - 1
    }
  })
  if (flag || !songList) {
    songList.splice(state.playingSongIndex + 2, 0, song)
    commit(types.SET_SONG_LIST, songList)
  } else {
    commit(types.SET_PLAY_SONG_INDEX, index)
    console.log('播放列表中已有这首歌')
  }
  commit(types.PLAYING, true)
}

export const historySongList = function ({commit, state}, song) {
  let flag = true
  let oldList = state.historySongList.slice()
  oldList.forEach((oldSong) => {
    if (oldSong.song_id === song.song_id) {
      flag = false
    }
  })
  if (flag) {
    oldList.push(song)
    flag && commit(types.SET_HISTORY_SONG_LIST, oldList)
  }
}

export const songList = function ({commit, state}, list) {
  let songList = state.songList.slice()
  list.forEach(newSong => {
    let flag = true
    songList.forEach(oldSong => {
      if (oldSong.song_id === newSong.song_id) flag = false
    })
    flag && songList.push(newSong)
  })
  let len = songList.length
  len === state.songList.length &&
    console.log('已经添加到歌单')
  len
    ? commit(types.SET_SONG_LIST, songList)
    : songList = list
  commit(types.PLAYING, true)
}

export const prevSong = function ({commit, state}) {
  let index = state.playingSongIndex + 1
  let songsAmount = state.songList.length - 1
  index = index - 1 < 0 ? songsAmount : index - 1
  commit(types.SET_PLAY_SONG_INDEX, index - 1)
  commit(types.PLAYING, true)
}

export const nextSong = function ({commit, state}) {
  let index = state.playingSongIndex + 1
  let songsAmount = state.songList.length - 1
  index = index + 1 > songsAmount ? 0 : index + 1
  commit(types.SET_PLAY_SONG_INDEX, index - 1)
  commit(types.PLAYING, true)
}

export const setPlayMode = function ({commit, state}) {
  let mode = (state.playMode + 1) % 3
  commit('SET_PLAY_MODE', mode)
}
