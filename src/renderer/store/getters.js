export const songList = state => state.songList

export const songListType = state => state.songListType

export const historySongList = state => state.historySongList

export const playingSong = state => state.songList[state.playingSongIndex + 1]

export const playMode = state => state.playMode

export const playingSongId = state => {
  let index = state.playingSongIndex + 1
  return state.songList[index] && state.songList[index].song_id
}

export const playing = state => state.playing

export const showPlayer = state => state.showPlayer

export const songAmount = state => state.songList.length

export const topDetail = state => state.topDetail
