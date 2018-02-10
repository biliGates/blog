import {URL, COMMON_PARAMS} from './config'
import jsonp from '@/common/js/jsonp'

export function getSong (id) {
  let params = Object.assign({}, COMMON_PARAMS, {
    method: 'baidu.ting.song.playAAC',
    songid: id
  })
  return jsonp(URL, params)
}

export function getLrc (id) {
  let params = Object.assign({}, COMMON_PARAMS, {
    method: 'baidu.ting.song.lry',
    songid: id
  })
  return jsonp(URL, params)
}
