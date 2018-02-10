import * as types from './mutation-type'
import {SONG_LIST_TYPE, PLAY_MODE} from '@/common/js/vuex.config'
import {SUFFLE_LIST} from '@/common/js/suffle-list'

export const playingSong = function ({commit, state}, song) {
  let flag = true
  let songList = state.songList.slice()
  let index = 0
  let playingSongIndex = state.playingSongIndex
  songList.forEach((oldSong, i) => {
    if (oldSong.song_id === song.song_id) {
      flag = false
      index = i - 1
    }
  })
  if (flag || !songList) {
    songList.splice(playingSongIndex + 2, 0, song)
    commit(types.SET_SONG_LIST, songList)
    commit(types.PLAYING, true)
  } else {
    if (songList[playingSongIndex + 1].song_id === song.song_id) {
      state.playing
        ? commit(types.PLAYING, false)
        : commit(types.PLAYING, true)
    } else {
      commit(types.SET_PLAY_SONG_INDEX, index)
      console.log('播放列表中已有这首歌')
      commit(types.PLAYING, true)
    }
  }
}

export const delectAllSongs = function ({commit, state}) {
  state.songListType === SONG_LIST_TYPE.current
    ? commit(types.SET_SONG_LIST, [])
    : commit(types.SET_HISTORY_SONG_LIST, [])
}

export const delectSong = function ({commit, state}, songId) {
  let list = state.songListType === SONG_LIST_TYPE.current
    ? state.songList : state.historySongList
  list.forEach((song, index) => {
    if (song.song_id === songId) {
      commit(types.DELECT_SONG, index)
    }
  })
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
  if (mode === PLAY_MODE.random) {
    state.oldList = state.songList.slice()
    let list = state.songList.slice()
    commit(types.SET_SONG_LIST, SUFFLE_LIST(list))
    commit(types.SET_PLAY_SONG_INDEX, -1)
  } else if (mode === PLAY_MODE.sequence && state.oldList) {
    commit(types.SET_SONG_LIST, state.oldList)
    commit(types.SET_PLAY_SONG_INDEX, -1)
  }
  commit(types.SET_PLAY_MODE, mode)
}

export const radioSongEnd = function ({commit, state}, song) {
  let oldSongList = state.historySongList.slice()
  let flag = true
  oldSongList.forEach((oldSong) => {
    if (oldSong.song_id === song.song_id) {
      flag = false
    }
  })
  if (flag) {
    oldSongList.push(song)
    commit(types.SET_HISTORY_SONG_LIST, oldSongList)
  } else {
    console.log('历史记录中已有这首歌')
  }
  commit(types.NEED_PREV_SONG, true)
}
