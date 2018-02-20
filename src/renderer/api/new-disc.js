import {URL, COMMON_PARAMS} from './config'
import jsonp from '@/common/js/jsonp'

export default function (offset = 0, limit = 50) {
  let params = Object.assign({}, COMMON_PARAMS, {
    method: 'baidu.ting.plaza.getRecommendAlbum',
    offset: offset,
    limit: limit
  })
  return jsonp(URL, params)
}
