import {URL, COMMON_PARAMS} from './config'
import jsonp from '@/common/js/jsonp'

export function getSingerInfo (id) {
  let params = Object.assign({}, COMMON_PARAMS, {
    method: 'baidu.ting.artist.getinfo',
    tinguid: id
  })
  return jsonp(URL, params)
}

export function getSingerSongList (id, amount = 30) {
  let params = Object.assign({}, COMMON_PARAMS, {
    method: 'baidu.ting.artist.getSongList',
    tinguid: id,
    offset: 0,
    limits: amount
  })
  return jsonp(URL, params)
}
