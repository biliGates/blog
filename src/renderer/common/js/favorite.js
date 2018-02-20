export default function favorite (favoriteList, songs) {
  let flag = false
  if (!favoriteList || !songs || !favoriteList.length) {
    return flag
  }
  favoriteList.forEach((favoriteSong) => {
    if (favoriteSong.song_id === songs.song_id) {
      flag = true
    }
  })
  return flag
}
