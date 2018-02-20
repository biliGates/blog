import jsonp from '@/common/js/jsonp'
import {URL, COMMON_PARAMS} from '@/api/config'

export default function () {
  let params = Object.assign({}, COMMON_PARAMS, {
    method: 'baidu.ting.artist.get72HotArtist',
    offset: 0,
    limit: 100 // 只能请求到100条数据
  })
  return jsonp(URL, params)
}
