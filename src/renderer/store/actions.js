import * as types from './mutation-type'
import {SONG_LIST_TYPE, PLAY_MODE} from '@/common/js/vuex.config'
import {SUFFLE_LIST} from '@/common/js/suffle-list'
import {getLocalStorage, setLocalStorage} from '@/common/js/storage'

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
  if (flag) {
    // 在当前播当的歌后面添加歌曲
    console.log(1)
    songList.splice(playingSongIndex + 2, 0, song)
    commit(types.SET_SONG_LIST, songList)
    if (songList.length > 1) {
      commit(types.SET_PLAY_SONG_INDEX, playingSongIndex + 1)
    }
    commit(types.PLAYING, true)
  } else {
    console.log(2)
    commit(types.SET_PLAY_SONG_INDEX, index)
    console.log('播放列表中已有这首歌')
    // 如果当前播放的音乐被点击，就暂停播放
    playingSongIndex === index && state.playing
      ? commit(types.PLAYING, false)
      : commit(types.PLAYING, true)
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
      if (oldSong.song_id === newSong.song_id) {
        flag = false
      }
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

export const setFavoriteSongList = function ({commit, state}, list) {
  let favoriteSongList = state.favoriteSongList.slice()
  if (Array.isArray(list)) {
    list.forEach((song) => {
      let flag = true
      favoriteSongList.forEach((oldSong) => {
        if (oldSong.song_id === song.song_id) {
          flag = false
        }
      })
      song.favoriteTime = Number(new Date())
      flag && favoriteSongList.push(song)
    })
    commit(types.SET_FAVORITE_SONG_LIST, favoriteSongList)
  } else {
    let flag = true
    let index = 0
    favoriteSongList.forEach((oldSong, i) => {
      if (oldSong.song_id === list.song_id) {
        flag = false
        index = i
      }
    })
    if (flag) {
      favoriteSongList.push(list)
      list.favoriteTime = new Date().getTime()
      commit(types.SET_FAVORITE_SONG_LIST, favoriteSongList)
    } else {
      favoriteSongList.splice(index, 1)
      commit(types.SET_FAVORITE_SONG_LIST, favoriteSongList)
    }
  }
}

export const delectFavoriteSong = function ({commit, state}, song) {
  let songList = state.favoriteSongList.slice()
  let newList = []
  songList.forEach((favoriteSong) => {
    if (favoriteSong.song_id !== song.song_id) {
      newList.push(favoriteSong)
    }
  })
  commit(types.DELECT_FAVORITE_SONG, newList)
}

export const loadLocalStorage = function ({commit}) {
  let songList = getLocalStorage.getSongList()
  let historySongList = getLocalStorage.getHistorySongList()
  let favoriteSongList = getLocalStorage.getFavoriteSongList()
  let playingSongIndex = getLocalStorage.getPlayingSongIndex()
  let volume = getLocalStorage.getVolume()
  let mode = getLocalStorage.getPlayMode()
  songList && commit(types.SET_SONG_LIST, songList)
  historySongList && commit(types.SET_HISTORY_SONG_LIST, historySongList)
  favoriteSongList && commit(types.SET_FAVORITE_SONG_LIST, favoriteSongList)
  playingSongIndex && commit(types.SET_PLAY_SONG_INDEX, playingSongIndex)
  volume && commit(types.SET_VOLUME, volume)
  mode && commit(types.SET_PLAY_MODE, mode)
}

export const writeLocalStorage = function ({state}) {
  setLocalStorage.setSongList(state.songList)
  setLocalStorage.setHistorySongList(state.historySongList)
  setLocalStorage.setFavoriteSongList(state.favoriteSongList)
  setLocalStorage.setPlayingSongIndex(state.playingSongIndex)
  setLocalStorage.setVolume(state.volume)
  setLocalStorage.setPlayMode(state.playMode)
}
